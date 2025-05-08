import Chat from "@/models/Chat";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === "GET") {
        const { senderId, receiverId } = req.query;

        if (!senderId || !receiverId) {
            return res.status(400).json({ error: "Missing senderId or receiverId" });
        }

        try {
            const messages = await Chat.find({
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            }).sort({ createdAt: 1 });

            return res.status(200).json(messages);
        } catch (error) {
            console.error("Error fetching messages:", error);
            return res.status(500).json({ error: "Error fetching messages" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
