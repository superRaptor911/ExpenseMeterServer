/* eslint-disable no-throw-literal */
const {postRequest, getRequest} = require('../Utility');
const {default: fetch} = require('node-fetch');

// const server = 'https://raptor-trading.herokuapp.com';
const server = 'http://localhost:8080';

async function loginUser(name, password) {
  try {
    const response = await postRequest(server + '/users/login', {
      name: name,
      password: password,
    });

    console.log(response);
  } catch (e) {
    console.error('FundTest::addFund', e);
  }
}

async function addTrasaction(
  name,
  password,
  title,
  transType,
  note,
  date,
  amount,
  category,
) {
  try {
    const response = await postRequest(server + '/transaction/add', {
      name: name,
      password: password,
      title: title,
      transType: transType,
      note: note,
      date: date,
      amount: amount,
      category: category,
    });

    console.log(response);
    return response;
  } catch (e) {
    console.error('FundTest::addTrasactions', e);
  }
}

module.exports.testLoginUser = loginUser;
module.exports.testAddTransaction = addTrasaction;
