const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  car: {type: String, required: true},
});
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
},
showroom: [carSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;