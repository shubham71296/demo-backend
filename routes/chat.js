const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.post("/one-to-one", auth, chatController.createOnetoOneChat);

module.exports = router; 
