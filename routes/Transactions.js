const {
  addTrasactions,
  editTransaction,
  deleteTransaction,
  listTransaction,
} = require('../controller/Transactions');

const router = require('express').Router();

router.post('/', listTransaction);
router.post('/add', addTrasactions);
router.post('/edit', editTransaction);
router.post('/delete', deleteTransaction);

module.exports.TransactionRouter = router;
