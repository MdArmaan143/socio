const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batch: { type: String, required: true },
  company: { type: String, required: true },
  linkedin: { type: String, required: true },
  review: { type: String, required: true },
  societyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true }
});

const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;
