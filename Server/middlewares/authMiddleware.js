import User from "../models/userModel.js";
import matchPassword from "../utils/matchPassword.js";

const authMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Parameters missing in the body");
  }

  const user = await User.findOne({ email });

  if (user && (await matchPassword(password, user))) {
    req.user = user;
    next();
  } else {
    return res.status(400).send("There was a problem with your data!!!");
  }
};

export default authMiddleware;
