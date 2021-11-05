const CategoryModel = require('../models/Categorymodel');

async function listCategories(_req, res) {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).json({status: true, data: categories});
  } catch (e) {
    /* handle error */
    console.error('Category::List categories ', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}

async function addCategory(req, res) {
  try {
    const {title, color, description, dailyLimit, weeklyLimit, monthlyLimit} =
      req.body;

    const doc = new CategoryModel();
    doc.title = title;
    doc.color = color;
    doc.description = description;
    doc.dailyLimit = dailyLimit;
    doc.weeklyLimit = weeklyLimit;
    doc.monthlyLimit = monthlyLimit;
    await doc.save();
    res.status(200).json({status: true, data: doc});
  } catch (e) {
    /* handle error */
    console.error('Category::Add category ', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}

async function editCategory(req, res) {
  try {
    const {
      id,
      title,
      color,
      description,
      dailyLimit,
      weeklyLimit,
      monthlyLimit,
    } = req.body;

    const doc = await CategoryModel.findOne({_id: id});
    doc.title = title;
    doc.color = color;
    doc.description = description;
    doc.dailyLimit = dailyLimit;
    doc.weeklyLimit = weeklyLimit;
    doc.monthlyLimit = monthlyLimit;
    await doc.save();
    res.status(200).json({status: true, data: doc});
  } catch (e) {
    /* handle error */
    console.error('Category::Add category ', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}

async function deleteCategory(req, res) {
  try {
    const {id} = req.body;

    await CategoryModel.deleteOne({_id: id});
    res.status(200).json({status: true});
  } catch (e) {
    /* handle error */
    console.error('Category::Add category ', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}

module.exports.listCategories = listCategories;
module.exports.addCategory = addCategory;
module.exports.editCategory = editCategory;
module.exports.deleteCategory = deleteCategory;
