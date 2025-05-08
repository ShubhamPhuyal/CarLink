import FrontUser from "@/models/FrontUser";
import User from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "POST") {
    const { userId } = req.body;

    try {
      // Check FrontUser schema
      let user = await FrontUser.findByIdAndUpdate(userId, { online: false });

      // If not found in FrontUser, check User schema
      if (!user) {
        user = await User.findByIdAndUpdate(userId, { online: false });
      }

      if (user) {
        res.status(200).json({ message: "User marked as offline" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error setting user offline:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}