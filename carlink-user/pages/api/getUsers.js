import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import FrontUser from "../../models/FrontUser";

export default async function handler(req, res) {
  await mongooseConnect();

  const { role } = req.query;

  try {
    let users;
    if (role === "admin") {
      users = await FrontUser.find({}, "name email");
    } else {
      users = await User.find({}, "name email");
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}
