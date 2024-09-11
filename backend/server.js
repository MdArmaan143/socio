require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const User = require('./models/User');
const College = require('./models/College');
const Society = require('./models/Society');
const Student = require('./models/Student');
const Alumni = require('./models/Alumni');
const Discussion = require('./models/Discussion');
// const Comment = require('./models/Comment');
const PastEvent = require('./models/PastEvent');
const UpcomingEvent = require('./models/UpcomingEvent');
const TempStudent = require('./models/TempStudent');
const SocietyMember = require('./models/SocietyMembers');
const TempSociety = require('./models/TempSociety');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

let userSignupType = '';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/callback',
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                signedUp: true,
                signupType: userSignupType,
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('Unauthorized');
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'societies',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});

const uploadsStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png','avif'],
    },
});

const upload = multer({ storage: storage });
const uploadUploads = multer({ storage: uploadsStorage });

app.post('/signup/college', (req, res) => {
    userSignupType = 'college';
    res.status(200).send('College signup initialized');
});

app.post('/signup/society', (req, res) => {
    userSignupType = 'society';
    res.status(200).send('Society signup initialized');
});

app.post('/signup/student', (req, res) => {
    userSignupType = 'student';
    res.status(200).send('Student signup initialized');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        switch (req.user.signupType) {
            case 'college':
                res.redirect('http://localhost:3000/form/college');
                break;
            case 'society':
                res.redirect('http://localhost:3000/form/society');
                break;
            case 'student':
                res.redirect('http://localhost:3000/form/student');
                break;
            default:
                res.redirect('http://localhost:3000');
                break;
        }
    }
);

app.get('/logout', (req, res) => {
    req.logout(() => res.redirect('http://localhost:3000'));
});

app.get('/user', (req, res) => {
    res.send(req.user);
});

app.post('/college/details', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (user) {
            user.details = req.body; 
            await user.save();
            res.status(200).send('College details saved');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error saving college details');
    }
});

app.post('/society/details', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (user) {
            user.details = req.body;
            await user.save();
            res.status(200).send('Society details saved');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error saving society details');
    }
});

app.post('/student/details', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (user) {
            const student = new Student({
                name: req.body.name,
                email: req.body.email,
                stream: req.body.stream,
                batch: req.body.batch,
                collegeName: req.body.collegeName,
                userId: user._id,
            });

            await student.save();

            res.status(200).send('Student details saved in the student collection');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error('Error saving student details:', err);
        res.status(500).send('Error saving student details');
    }
});


app.get('/college/details', ensureAuthenticated, (req, res) => {
    if (req.user && req.user.signupType === 'college') {
        res.status(200).send(req.user.details);
    } else {
        res.status(404).send('No college details found');
    }
});

app.get('/society/details', ensureAuthenticated, (req, res) => {
    if (req.user && req.user.signupType === 'society') {
        res.status(200).send(req.user.details);
    } else {
        res.status(404).send('No society details found');
    }
});

app.get('/student/details', ensureAuthenticated, async (req, res) => {
    try {
        if (req.user && req.user.signupType === 'student') {
            const student = await Student.findOne({ userId: req.user._id });
            if (student) {
                res.status(200).send(student);
            } else {
                res.status(404).send('No student details found');
            }
        } else {
            res.status(403).send('Unauthorized');
        }
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).send('Server error');
    }
});

app.post('/add-society-temp', ensureAuthenticated, upload.single('societyLogo'), async (req, res) => {
    try {
        const tempSociety = new TempSociety({
            societyName: req.body.societyName,
            mentorName: req.body.mentorName,
            email: req.body.email,
            type: req.body.type,
            collegeId: req.body.collegeId,
            description: req.body.description,
            slogan: req.body.slogan,
            societyLogo: req.file ? req.file.path : null
        });

        await tempSociety.save();
        res.status(200).send('Society request submitted successfully');
    } catch (err) {
        console.error('Error submitting society request:', err);
        res.status(500).send('Server error');
    }
});

// pending requests
app.get('/college/requests', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id;

        const college = await College.findOne({ userId });
        if (!college) {
            return res.status(404).send('College not found');
        }

        const collegeId = college._id;

        const pendingRequests = await TempSociety.find({ collegeId });

        res.status(200).json(pendingRequests);
    } catch (err) {
        console.error('Error fetching society requests:', err);
        res.status(500).send('Server error');
    }
});

// accept society
app.post('/college/accept-society/:id', ensureAuthenticated, async (req, res) => {
    try {
        const tempSociety = await TempSociety.findById(req.params.id);
        if (!tempSociety) return res.status(404).send('Society request not found');

        const college = await College.findById(tempSociety.collegeId);
        if (!college) return res.status(404).send('College not found');

        const society = new Society({
            societyName: tempSociety.societyName,
            mentorName: tempSociety.mentorName,
            email: tempSociety.email,
            type: tempSociety.type,
            collegeId: tempSociety.collegeId,
            description: tempSociety.description,
            slogan: tempSociety.slogan,
            societyLogo: tempSociety.societyLogo,
            collegeName: college.collegeName,
            userId: tempSociety.userId,
        });
        await society.save();

        await TempSociety.findByIdAndDelete(req.params.id);

        res.status(200).send('Society accepted and added successfully');
    } catch (err) {
        console.error('Error accepting society request:', err);
        res.status(500).send('Server error');
    }
});

// society rejection
app.delete('/college/reject-society/:id', ensureAuthenticated, async (req, res) => {
    try {
        const tempSociety = await TempSociety.findByIdAndDelete(req.params.id);
        if (!tempSociety) return res.status(404).send('Society request not found');

        res.status(200).send('Society request rejected and deleted');
    } catch (err) {
        console.error('Error rejecting society request:', err);
        res.status(500).send('Server error');
    }
});

// request to join society
app.post('/society/join', async (req, res) => {
    try {
      const { societyId } = req.body;
      const studentId = req.user._id;
  
      const student = await Student.findOne({ userId: studentId });
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }
  
      const newTempStudent = new TempStudent({
        studentId,
        name: student.name,
        stream: student.stream,
        batch: student.batch,
        societyId
      });
      
      await newTempStudent.save();
      
      res.status(200).json({ message: 'Request to join society has been sent.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to request to join society.' });
    }
  });
  
  // accept join request
  app.post('/society/requests/accept', async (req, res) => {
    try {
      const { requestId } = req.body;
      const request = await TempStudent.findById(requestId);
      
      if (request) {
        const newMember = new SocietyMember({
          studentId: request.studentId,
          name: request.name,
          stream: request.stream,
          batch: request.batch,
          societyId: request.societyId
        });
        
        await newMember.save();
        await TempStudent.findByIdAndDelete(requestId);
        
        res.status(200).json({ message: 'Request accepted and student added to society.' });
      } else {
        res.status(404).json({ error: 'Request not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to accept the request.' });
    }
  });

  // all student join requests
app.get('/society/requests', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id;
        
        const society = await Society.findOne({ userId });
        if (!society) {
            return res.status(404).send('Society not found');
        }

        // find all join requests 
        const joinRequests = await TempStudent.find({ societyId: society._id }).populate('studentId');
        res.status(200).json(joinRequests);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

  

app.post('/society/membership-status', async (req, res) => {
    const { userId } = req.body;
    
    try {
      const societyMemberships = await SocietyMember.find({ studentId: userId });
      const pendingRequests = await TempStudent.find({ studentId: userId });
  
      const statusMap = {};
  
      societyMemberships.forEach((membership) => {
        statusMap[membership.societyId.toString()] = 'joined';
      });
  
      pendingRequests.forEach((request) => {
        statusMap[request.societyId.toString()] = 'pending';
      });
  
      res.json(statusMap);
    } catch (err) {
      console.error('Error fetching membership status:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });

app.get('/society/:collegeName/:societyName/details', async (req, res) => {
    try {
        const { collegeName, societyName } = req.params;
        const society = await Society.findOne({ collegeName, societyName });

        if (!society) {
            return res.status(404).send('Society not found');
        }

        res.json(society);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.post('/college/add', ensureAuthenticated, upload.single('collegeImage'), async (req, res) => {
    try {
        const existingCollege = await College.findOne({ userId: req.user._id });

        if (existingCollege) {
            return res.status(400).send('You have already added your college!');
        }

        const newCollege = new College({
            userId: req.user._id,
            collegeName: req.body.collegeName,
            universityName: req.body.universityName,
            location: req.body.location,
            email: req.body.email,
            collegeImage: req.file ? req.file.path : null
        });

        await newCollege.save();
        res.status(200).send('College added successfully');
    } catch (err) {
        console.error('Error adding college:', err);
        res.status(500).send('Server error');
    }
});

app.get('/college/exists/:userId', async (req, res) => {
    try {
        const college = await College.findOne({ userId: req.params.userId });
        res.status(200).json({ exists: !!college });
    } catch (err) {
        console.error('Error checking college existence:', err);
        res.status(500).send('Server error');
    }
});

app.get('/society/exists/:userId', async (req, res) => {
    try {
        const society = await Society.findOne({ userId: req.params.userId });
        res.status(200).json({ exists: !!society });
    } catch (err) {
        res.status(500).send('Server error');
    }
});


app.post('/society/add', ensureAuthenticated, upload.single('societyLogo'), async (req, res) => {
    try {
        const newTempSociety = new TempSociety({
            userId: req.user._id,
            collegeId: req.body.collegeId,
            societyName: req.body.societyName,
            mentorName: req.body.mentorName,
            email: req.body.email,
            type: req.body.type,
            slogan: req.body.slogan,
            societyLogo: req.file ? req.file.path : null,
            description: req.body.description,
        });

        await newTempSociety.save();
        res.status(200).send('Society request submitted successfully');
    } catch (err) {
        console.error('Error submitting society request:', err);
        res.status(500).send('Server error');
    }
});


app.get('/college/all', async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch colleges' });
    }
});

app.get('/society/all', async (req, res) => {
  const { collegeName } = req.query; 

  try {
      let societies;
      if (collegeName) {
          societies = await Society.find({ collegeName });
      } else {
          societies = await Society.find(); 
      }
      res.json(societies);
  } catch (err) {
      res.status(500).json({ error: 'Failed to fetch societies' });
  }
});

app.get('/college/societies', async (req, res) => {
    try {
        const collegeName = req.query.collegeName;
        const societies = await Society.find({ collegeName: collegeName });

        if (!societies || societies.length === 0) {
            return res.status(404).json({ message: 'No societies found for this college' });
        }

        const categorizedSocieties = societies.reduce((acc, society) => {
            if (!acc[society.type]) {
                acc[society.type] = [];
            }
            acc[society.type].push(society);
            return acc;
        }, {});

        res.status(200).json(categorizedSocieties);
    } catch (err) {
        console.error('Error fetching societies:', err);
        res.status(500).send('Server error');
    }
});

app.get('/societies/:collegeName/:societyName/members', async (req, res) => {
    try {
      const { societyName } = req.params;
      const decodedSocietyName = decodeURIComponent(societyName);
      
      const society = await Society.findOne({ societyName: decodedSocietyName });
      
      if (!society) {
        return res.status(404).json({ error: 'Society not found' });
      }
      
      const members = await SocietyMember.find({ societyId: society._id });
      
      res.status(200).json({ members });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch society members.' });
    }
  });
  
  app.post('/societies/:collegeName/:societyName/add-past-event', uploadUploads.array('photos', 10), async (req, res) => {
    const { collegeName, societyName } = req.params;
    const { title, description, videoUrl } = req.body;
    const decodedSocietyName = decodeURIComponent(societyName);

    try {
        const society = await Society.findOne({ collegeName, societyName: decodedSocietyName });

        if (!society) {
            return res.status(404).json({ error: 'Society not found' });
        }

        if (society.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You do not have permission to add an event to this society.' });
        }

        const photos = req.files.map(file => file.path);

        const newPastEvent = new PastEvent({
            societyId: society._id,
            title,
            description,
            photos,
            videoUrl,
            createdAt: new Date(),
        });

        await newPastEvent.save();
        res.status(201).json({ message: 'Past event added successfully', pastEvent: newPastEvent });
    } catch (error) {
        console.error('Error adding past event:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/societies/:collegeName/:societyName/past-events', async (req, res) => {
    const { collegeName, societyName } = req.params;
    const decodedSocietyName = decodeURIComponent(societyName);

    try {
        const society = await Society.findOne({ collegeName, societyName: decodedSocietyName });

        if (!society) {
            return res.status(404).json({ error: 'Society not found' });
        }
        const pastEvents = await PastEvent.find({ societyId: society._id });

        res.status(200).json({ society, pastEvents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// add upcoming event
app.post('/societies/:collegeName/:societyName/add-upcoming-event', ensureAuthenticated, async (req, res) => {
    const { collegeName, societyName } = req.params;
    const decodedSocietyName = decodeURIComponent(societyName);
    const { title, description, date } = req.body;

    try {
        const society = await Society.findOne({ collegeName, societyName: decodedSocietyName });

        if (!society) {
            return res.status(404).json({ error: `Society ${decodedSocietyName} not found in college ${collegeName}` });
        }

        if (req.user.signupType === 'society' && req.user._id.equals(society.userId)) {
            const newEvent = new UpcomingEvent({
                societyId: society._id,
                title,
                description,
                date,
            });

            await newEvent.save();
            res.status(201).json({ success: true, message: 'Event added successfully!' });
        } else {
            res.status(403).json({ error: 'Unauthorized to add events.' });
        }
    } catch (error) {
        console.error(`Error adding event for ${decodedSocietyName} in ${collegeName}:`, error);
        res.status(500).json({ error: 'Failed to add event.' });
    }
});

app.get('/societies/:collegeName/:societyName/upcoming-events', async (req, res) => {
    const { collegeName, societyName } = req.params;
    const decodedSocietyName = decodeURIComponent(societyName);

    try {
        const society = await Society.findOne({ collegeName, societyName: decodedSocietyName });

        if (!society) {
            return res.status(404).json({ error: `Society ${decodedSocietyName} not found in college ${collegeName}` });
        }

        const events = await UpcomingEvent.find({ societyId: society._id }).sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        console.error(`Error fetching events for ${decodedSocietyName} in ${collegeName}:`, error);
        res.status(500).json({ error: 'Failed to fetch events.' });
    }
});

// for fetching societies
app.get('/societies/:collegeName/:societyName', async (req, res) => {
    const { collegeName, societyName } = req.params;
    try {
      const society = await Society.findOne({ collegeName, societyName });
      if (!society) {
        return res.status(404).json({ message: 'Society not found' });
      }
      res.json(society);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching society data' });
    }
  });

// Add a discussion
app.post('/societies/:collegeName/:societyName/add-discussion', async (req, res) => {
    const { title, content } = req.body;

    // Check if the user is logged in
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in to add a discussion.' });
    }

    const userId = req.user._id; // Assuming req.user is populated from authentication
    const { collegeName, societyName } = req.params;
    const decodedSocietyName = decodeURIComponent(societyName);

    try {
        const society = await Society.findOne({ collegeName, societyName: decodedSocietyName });

        if (!society) {
            return res.status(404).json({ message: 'Society not found' });
        }

        // Check if the user is the society creator or a member
        const isCreator = society.userId.equals(userId);
        const isMember = await SocietyMember.findOne({ societyId: society._id, studentId: userId });

        if (!isCreator && !isMember) {
            return res.status(403).json({ message: 'Access denied. You must be a society member or creator to add a discussion.' });
        }

        const newDiscussion = new Discussion({
            title,
            content,
            userId,
            societyId: society._id,
        });

        await newDiscussion.save();
        res.status(201).json(newDiscussion);
    } catch (error) {
        console.error('Error adding discussion:', error);
        res.status(500).json({ message: 'Failed to add discussion' });
    }
});

// Get discussions
app.get('/societies/:collegeName/:societyName/discussions', async (req, res) => {
    // Check if the user is logged in
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in to view discussions.' });
    }

    const { collegeName, societyName } = req.params;
    const decodedSocietyName = decodeURIComponent(societyName);
    const userId = req.user._id; 

    try {
        const society = await Society.findOne({ collegeName, societyName: decodedSocietyName });
        
        if (!society) {
            return res.status(404).json({ error: 'Society not found.' });
        }

        // if the user is the society creator or a member
        const isCreator = society.userId.equals(userId);
        const isMember = await SocietyMember.findOne({ societyId: society._id, studentId: userId });

        // Fetch discussions for society
        const discussions = await Discussion.find({ societyId: society._id })
            .populate('userId', 'name')
            .sort({ likes: -1, createdAt: -1 }); 

        // Include the isCreator flag in each discussion object
        const discussionsWithCreatorFlag = discussions.map(discussion => {
            return {
                ...discussion.toObject(),
                isCreator: discussion.userId._id.equals(society.userId) 
            };
        });

        // Return discussions along with flags for frontend access control
        res.status(200).json({
            discussions: discussionsWithCreatorFlag,
            isMember: !!isMember,   // Boolean flag indicating if the user is a member
            isCreator: isCreator    // if the user is the creator
        });
    } catch (error) {
        console.error('Error retrieving discussions:', error);
        res.status(500).json({ error: 'Failed to retrieve discussions.' });
    }
});

// Add or remove a like from a discussion
app.post('/societies/:collegeName/:societyName/discussions/:discussionId/like', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in to like the discussion.' });
    }

    const { collegeName, societyName, discussionId } = req.params;
    const userId = req.user._id;

    try {
        const discussion = await Discussion.findById(discussionId);

        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        // Check if the user already liked the discussion
        const alreadyLiked = discussion.likedBy.includes(userId);

        if (alreadyLiked) {
            // If liked, remove the like (unlike)
            discussion.likes -= 1;
            discussion.likedBy = discussion.likedBy.filter(id => id.toString() !== userId.toString());
        } else {
            // If not liked, add the like
            discussion.likes += 1;
            discussion.likedBy.push(userId);
        }

        await discussion.save();
        res.status(200).json({ likes: discussion.likes, likedByUser: !alreadyLiked });
    } catch (error) {
        console.error('Error liking/unliking discussion:', error);
        res.status(500).json({ message: 'Failed to like/unlike discussion.' });
    }
});

// Add comment to discussion
app.post('/societies/:collegeName/:societyName/discussions/:discussionId/comment', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in to comment on a discussion.' });
    }

    const { collegeName, societyName, discussionId } = req.params;
    const { comment } = req.body;
    const userId = req.user._id;
    const decodedSocietyName = decodeURIComponent(societyName);

    try {
        const society = await Society.findOne({ collegeName, societyName: decodedSocietyName });

        if (!society) {
            return res.status(404).json({ message: 'Society not found.' });
        }

        const isCreator = society.userId.equals(userId);
        const isMember = await SocietyMember.findOne({ societyId: society._id, studentId: userId });

        if (!isCreator && !isMember) {
            return res.status(403).json({ message: 'Access denied. You must be a society member or creator to comment on a discussion.' });
        }

        // Find the discussion and add the new comment
        const discussion = await Discussion.findById(discussionId);
        discussion.comments.push({ userId, comment });
        await discussion.save();

        // Populate the userId field in the comments with the user's name
        const populatedDiscussion = await Discussion.findById(discussionId)
            .populate('comments.userId', 'name');  

        res.status(200).json({ 
            message: 'Comment added successfully.', 
            comments: populatedDiscussion.comments  
        });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

app.post('/societies/:collegeName/:societyName/add-alumni', async (req, res) => {
    const { collegeName, societyName } = req.params;
    const { name, batch, company, linkedin, review } = req.body;
    const decodedSocietyName = decodeURIComponent(societyName);

    try {
        const society = await Society.findOne({ collegeName, societyName: decodedSocietyName });
        if (!society) {
            return res.status(404).json({ message: 'Society not found' });
        }

        // Check if the logged-in user is the society creator
        if (society.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You do not have permission to add alumni to this society.' });
        }

        const newAlumni = new Alumni({
            name,
            batch,
            company,
            linkedin,
            review,
            societyId: society._id
        });

        await newAlumni.save();
        res.status(201).json({ message: 'Alumni added successfully', alumni: newAlumni });
    } catch (error) {
        res.status(500).json({ message: 'Error adding alumni', error });
    }
});
  
app.get('/societies/:collegeName/:societyName/alumni', async (req, res) => {
    const { collegeName, societyName } = req.params;
    
    try {
      // Fetch the society
      const society = await Society.findOne({
        collegeName: decodeURIComponent(collegeName),
        societyName: decodeURIComponent(societyName),
      });
  
      if (society) {
        // Fetch the alumni related to the society
        const alumni = await Alumni.find({ societyId: society._id });
  
        res.status(200).json({ society, alumni });
      } else {
        res.status(404).json({ message: 'Society not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
});

app.listen(5000, () => {
    console.log('Server listening on PORT 5000');
});
