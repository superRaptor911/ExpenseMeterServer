const {loginUser} = require('../controller/User');
const router = require('express').Router();

router.post('/login', loginUser);

module.exports.UserRouter = router;
