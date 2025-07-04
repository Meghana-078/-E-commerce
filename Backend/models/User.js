const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profile: String, // optional image
});

module.exports = mongoose.model('User', userSchema);
