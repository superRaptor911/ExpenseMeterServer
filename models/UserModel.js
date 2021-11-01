const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  name: String,
  password: String,
});

const UserModel = mongoose.model('User', userModel);
module.exports = UserModel;
