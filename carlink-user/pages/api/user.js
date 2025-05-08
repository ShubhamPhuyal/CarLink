import FrontUser from "@/models/FrontUser";
import User from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  // Disable caching
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (req.method === "GET") {
    const { email } = req.query;

    try {
      // Check FrontUser schema (Regular User)
      let user = await FrontUser.findOne({ email });

      // If not found in FrontUser, check User schema (Admin)
      if (!user) {
        user = await User.findOne({ email });
      }

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}