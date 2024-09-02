const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();
router.get('/', userController.getAllUsers);
router.post('/signup', userController.postSignup);
router.post('/login', userController.postLogin);
module.exports = router;