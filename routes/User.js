const {loginUser, registerUser} = require('../controller/User');
const router = require('express').Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports.UserRouter = router;
