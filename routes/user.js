const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.validateResetToken);

module.exports = router; 