/* eslint-disable no-throw-literal */
const {postRequest, getRequest} = require('../Utility');
const {default: fetch} = require('node-fetch');

// const server = 'https://raptor-trading.herokuapp.com';
const server = 'http://localhost:8080';

function checkStatus(data) {
  if (data && data.status) {
    return;
  }

  throw 'Error in request';
}

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
module.exports.testLoginUser = loginUser;
