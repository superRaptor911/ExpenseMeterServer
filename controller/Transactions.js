const TransactionModel = require('../models/TransactionModel');

async function addTrasactions(req, res) {
  try {
    const {name, transType, note, date, amount} = req.body;

    const doc = new TransactionModel();
    doc.username = name;
    doc.transType = transType;
    doc.note = note;
    doc.date = date;
    doc.amount = amount;
    await doc.save();
    res.status(200).json({status: true, message: 'GG'});
  } catch (e) {
    console.error('Transactions::Error in addTrasactions, ', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}

module.exports.addTrasactions = addTrasactions;
