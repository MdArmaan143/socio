const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collegeName: { type: String, required: true },
  universityName: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  collegeImage: { type: String },
  societies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Society' }]
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;
