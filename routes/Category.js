const {
  addCategory,
  editCategory,
  deleteCategory,
  listCategories,
} = require('../controller/Category');

const router = require('express').Router();

router.post('/', listCategories);
router.post('/add', addCategory);
router.post('/edit', editCategory);
router.post('/delete', deleteCategory);

module.exports.CategoryRouter = router;
