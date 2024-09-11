const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: String,
  email: String,
  signedUp: { type: Boolean, default: false },
  signupType: String,
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
