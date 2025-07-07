const Message = require("../models/Message");
const Chat = require("../models/Chat");

exports.sendMessage = async (req, res) => {
  try {
    const myId = req.user.userId;
    const { chatId, content } = req.body;

    if (!chatId || !content) {
      return res.status(400).json({ message: "chatId and content are required" });
    }

    let message = await Message.create({
      sender: myId,
      content,
      chat: chatId,
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

    message = (await message.populate("sender", "-__v"));
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getMessagesByChat = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "-__v")
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};