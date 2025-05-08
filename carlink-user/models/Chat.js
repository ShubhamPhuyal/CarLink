import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true }, // No ref, as it can be either FrontUser or User
    senderType: { type: String, required: true, enum: ["FrontUser", "User"] }, // "FrontUser" or "User"
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true }, // No ref, as it can be either FrontUser or User
    receiverType: { type: String, required: true, enum: ["FrontUser", "User"] }, // "FrontUser" or "User"
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default Chat;