import User from "../models/userModel.js";
import matchPassword from "../utils/matchPassword.js";

const resetPasswordMiddleware = async (req, res, next) => {
  const { code, password, confirmPassword , email} = req.body;

  if (!email) {
    return res.status(400).send("Invalid email");
  }

  if (!code || !password || !confirmPassword) {
    return res.status(400).send("Invalid form");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  const user = await User.findOne({ resetPasswordCode: code });
  if (!user) {
    return res.status(400).send("Invalid code");
  }

  req.user = user;
  next();
  
};

export default resetPasswordMiddleware;
