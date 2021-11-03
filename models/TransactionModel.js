const mongoose = require('mongoose');

const transModel = new mongoose.Schema({
  username: String,
  title: String,
  transType: String,
  note: String,
  date: Date,
  amount: Number,
  category: String,
});

const TransactionModel = mongoose.model('TransactionModel', transModel);
module.exports = TransactionModel;
