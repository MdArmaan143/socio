const mongoose = require('mongoose');

const TempSocietySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    societyName: { type: String, required: true },
    mentorName: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
    description: { type: String, required: true },
    slogan: { type: String, required: true },
    societyLogo: { type: String },
});

module.exports = mongoose.model('TempSociety', TempSocietySchema);
