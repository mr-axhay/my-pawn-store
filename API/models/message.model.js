import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
{
  chatId: String,
  senderId: String,
  message: String
},
{
  timestamps: true
}
);

const Message = mongoose.model("Message", messageSchema);

export default Message;