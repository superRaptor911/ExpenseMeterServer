const CategoryModel = require('../models/Categorymodel');

async function addCategory(req, res) {
  try {
    const {name, color, description, dailyLimit, weeklyLimit, monthlyLimit} =
      req.body;

    const doc = new CategoryModel();
    doc.name = name;
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
      color,
      description,
      dailyLimit,
      weeklyLimit,
      monthlyLimit,
    } = req.body;

    const doc = await CategoryModel.findOne({_id: id});
    doc.name = name;
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

module.exports.addCategory = addCategory;
