const mongoose = require('mongoose');

const societySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collegeName: { type: String, required: true },
  societyName: { type: String, required: true },
  mentorName: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  slogan: { type: String },
  societyLogo: { type: String },
});

const Society = mongoose.model('Society', societySchema);

module.exports = Society;
