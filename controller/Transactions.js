const TransactionModel = require('../models/TransactionModel');

async function listTransaction(req, res) {
  try {
    const {name} = req.body;
    const trans = await TransactionModel.find({username: name});
    res.status(200).json({status: true, data: trans});
  } catch (e) {
    console.error('Transactions::Error in addTrasactions, ', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}

async function addTrasactions(req, res) {
  try {
    const {name, title, transType, note, date, amount, category} = req.body;

    const doc = new TransactionModel();
    doc.username = name;
    doc.title = title;
    doc.transType = transType;
    doc.note = note;
    doc.date = date;
    doc.amount = amount;
    doc.category = category;
    await doc.save();
    res.status(200).json({status: true, data: doc});
  } catch (e) {
    console.error('Transactions::Error in addTrasactions, ', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}

async function editTransaction(req, res) {
  try {
    const {id, title, transType, note, date, amount, category} = req.body;

    const doc = await TransactionModel.findOne({_id: id});
    if (!doc) {
      res.status(500).json({status: false, message: 'Cant find id' + id});
    }

    doc.title = title;
    doc.transType = transType;
    doc.note = note;
    doc.date = date;
    doc.amount = amount;
    doc.category = category;
    await doc.save();
    res.status(200).json({status: true, data: doc});
  } catch (e) {
    /* handle error */
    res.status(500).json({status: false, message: 'Error:' + e});
  }
}

async function deleteTrans(req, res) {
  try {
    const {id} = req.body;
    await TransactionModel.deleteOne({_id: id});
    res.status(200).json({status: true});
  } catch (e) {
    /* handle error */
    res.status(500).json({status: false, message: 'Error:' + e});
  }
}

module.exports.addTrasactions = addTrasactions;
module.exports.editTransaction = editTransaction;
module.exports.deleteTransaction = deleteTrans;
module.exports.listTransaction = listTransaction;
