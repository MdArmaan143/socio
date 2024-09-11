const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pastEventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photos: [String], 
  videoUrl: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  societyId: { type: Schema.Types.ObjectId, ref: 'Society', required: true }
});

module.exports = mongoose.model('PastEvent', pastEventSchema);
