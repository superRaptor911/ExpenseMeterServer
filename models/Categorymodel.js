const mongoose = require('mongoose');

const categorymodel = new mongoose.Schema({
  name: String,
  color: String,
  description: String,
  dailyLimit: {
    type: Number,
    default: 0,
  },
  weeklyLimit: {
    type: Number,
    default: 0,
  },
  monthlyLimit: {
    type: Number,
    default: 0,
  },
});

const CategoryModel = mongoose.model('Categories', categorymodel);
module.exports = CategoryModel;
