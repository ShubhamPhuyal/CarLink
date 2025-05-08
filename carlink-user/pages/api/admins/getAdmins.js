import { mongooseConnect } from "@/lib/mongoose";
import User from "@/models/User"; // Import the Admin model

export default async function handler(req, res) {
  if (req.method === "GET") {
    await mongooseConnect();

    try {
      const admins = await User.find().select("_id name email");
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admins", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}