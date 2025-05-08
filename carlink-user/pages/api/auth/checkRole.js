import { mongooseConnect } from "@/lib/mongoose";
import FrontUser from "@/models/FrontUser";
import User from "@/models/User";

export default async function handler(req, res) {
    await mongooseConnect();
    
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });

    try {
        const admin = await User.findOne({ email });
        if (admin) return res.status(200).json({ role: "admin" });

        const frontUser = await FrontUser.findOne({ email });
        if (frontUser) return res.status(200).json({ role: "user" });

        return res.status(404).json({ error: "User not found" });
    } catch (error) {
        res.status(500).json({ error: "Error checking user role" });
    }
}
