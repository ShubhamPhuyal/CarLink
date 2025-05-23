import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
