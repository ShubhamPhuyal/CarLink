import { mongooseConnect } from "@/lib/mongoose";
import Chat from "@/models/Chat";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { senderId, senderType, receiverId, receiverType } = req.query;

  try {
    const messages = await Chat.find({
      $or: [
        { senderId, senderType, receiverId, receiverType },
        { senderId: receiverId, senderType: receiverType, receiverId: senderId, receiverType: senderType }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
}