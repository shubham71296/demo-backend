const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");

router.post("/send-message", auth, messageController.sendMessage);
router.get("/get-messages/:chatId", auth, messageController.getMessagesByChat);


module.exports = router;