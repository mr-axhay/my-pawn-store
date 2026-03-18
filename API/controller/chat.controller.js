import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {

    const { chatId, senderId, message } = req.body;

    const newMessage = new Message({
      chatId,
      senderId,
      message
    });

    await newMessage.save();

    res.json(newMessage);

  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessages = async (req, res) => {
  try {

    const messages = await Message.find({
      chatId: req.params.chatId
    });

    res.json(messages);

  } catch (err) {
    res.status(500).json(err);
  }
};