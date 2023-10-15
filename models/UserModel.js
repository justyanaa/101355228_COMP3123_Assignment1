const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      maxlength: 100,
      unique: true,  
      required: true,
    },
    email: {
      type: String,
      maxlength: 50,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      maxlength: 50,
      required: true,
    },
  });
  
  module.exports = mongoose.model('user', userSchema);