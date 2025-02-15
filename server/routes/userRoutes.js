const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Create a new service
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/verify', userController.verifyEmail);
module.exports = router;
