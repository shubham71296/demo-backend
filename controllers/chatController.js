const Chat = require("../models/Chat");

exports.createOnetoOneChat = async (req, res) => {
  try {
    const sender = req.user.userId;
    const receiver = req.body.receiverId;

    if (!receiver) {
      return res.status(400).json({ message: "receiverId is required" });
    }

    let existingChat = await Chat.findOne({
      isGroup: false,
      users: { $all: [sender, receiver], $size: 2 },
    });

    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    const chat = await Chat.create({
      chatName: "Direct Chat",
      isGroup: false,
      users: [sender, receiver],
    });

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
