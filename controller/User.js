/* eslint-disable no-throw-literal */
const UserModel = require('../models/UserModel');
const {hashString} = require('../Utility');

async function checkAuth(req) {
  try {
    const {name, password} = req.body;
    const user = await UserModel.findOne({name: name});

    if (user) {
      const hash = hashString(password);
      if (hash !== user.password) {
        throw 'Wrong Password';
      }
    } else {
      throw 'Please register';
    }
  } catch (e) {
    /* handle error */
    console.error('User::error', e);
    throw e;
  }
}

async function loginUser(req, res) {
  try {
    const {name, password} = req.body;

    if (name.length < 3 || password.length < 3) {
      res
        .status(500)
        .json({status: false, message: 'Username or pasword is too short'});
      return;
    }

    const user = await UserModel.findOne({name: name});
    if (user) {
      const hash = hashString(password);
      if (hash === user.password) {
        res.status(200).json({status: true, message: 'GG'});
      } else {
        res.status(200).json({status: false, message: 'WRONG PASSWORD'});
      }
    } else {
      registerUser(req, res);
    }
  } catch (e) {
    console.error('User::LoginUser failed!, ', e);
    res.status(500).json({status: false, message: e});
  }
}

async function registerUser(req, res) {
  try {
    const {name, password} = req.body;
    const doc = new UserModel();
    doc.name = name;
    doc.password = hashString(password);
    await doc.save();

    res.status(200).json({status: true, message: 'Registered ' + name});
  } catch (e) {
    console.error('User::LoginUser failed!, ', e);
    res.status(500).json({status: false, message: e});
  }
}

module.exports.loginUser = loginUser;
module.exports.checkAuth = checkAuth;
