const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempStudentSchema = new Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  stream: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  societyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Society',
    required: true
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TempStudent', TempStudentSchema);
