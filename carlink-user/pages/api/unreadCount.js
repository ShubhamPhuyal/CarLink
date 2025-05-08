import axios from "axios";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch unread messages for the user
    const response = await axios.get(`/api/chat/getMessage`, {
      params: {
        receiverId: userId,
        read: false, // Only fetch unread messages
      },
    });

    // Count the number of unread messages
    const unreadCount = response.data.length;

    res.status(200).json({ count: unreadCount });
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    res.status(500).json({ error: "Failed to fetch unread messages" });
  }
}