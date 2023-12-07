import User from "../models/userModel.js";
import matchPassword from "../utils/matchPassword.js";

const authMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Parameters missing in the body");
  }

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Email does not exist");
  }

  // Check if password matches
  const isMatch = await matchPassword(password, user.password);

  if (!isMatch) {
    return res.status(400).send("Invalid password");
  }

  req.user = user;
  next();
};

export default authMiddleware;
