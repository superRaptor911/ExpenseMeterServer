const CategoryModel = require('../models/Categorymodel');

async function listCategories(req, res) {
  try {
    const {name} = req.body;
    const categories = await CategoryModel.find({
      $or: [{username: name}, {username: undefined}],
    });
    res.status(200).json({status: true, data: categories});
  } catch (e) {
    /* handle error */
    console.error('Category::List categories ', e);
    res.status(500).json({status: false, message: 'Error'});
  }
}

async function addCategory(req, res) {
  try {
    const {
      name,
      title,
      color,
      description,
      dailyLimit,
      weeklyLimit,
      monthlyLimit,
    } = req.body;

    const doc = new CategoryModel();
    doc.username = name;
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
      name,
      title,
      color,
      description,
      dailyLimit,
      weeklyLimit,
      monthlyLimit,
    } = req.body;

    const doc = await CategoryModel.findOne({_id: id, username: name});

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
    const {id, name} = req.body;
    await CategoryModel.deleteOne({_id: id, username: name});
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
