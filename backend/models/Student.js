const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  stream: { type: String, required: true },
  batch: { type: String, required: true },
  collegeName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
