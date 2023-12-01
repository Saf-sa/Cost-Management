import User from "../models/userModel.js";

const resetPasswordMiddleware = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is missing in the body");
  }

  const user = await User.findOne({ email });

  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(400).send("User not found");
  }
};
