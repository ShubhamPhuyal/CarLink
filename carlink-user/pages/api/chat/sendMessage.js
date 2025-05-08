import { mongooseConnect } from "@/lib/mongoose";
import Chat from "@/models/Chat";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { senderId, senderType, receiverId, receiverType, message } = req.body;

  if (!senderId || !senderType || !receiverId || !receiverType || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newMessage = new Chat({ senderId, senderType, receiverId, receiverType, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
}