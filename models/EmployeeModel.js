const mongoose = require('mongoose');

const emplSchema = new mongoose.Schema({
  first_name: {
    type: String,
    maxlength: 100,
    required: true,
  },
  last_name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    maxlength: 50,
    unique: true,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    maxlength: 25,
  },
  salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('employee', emplSchema);