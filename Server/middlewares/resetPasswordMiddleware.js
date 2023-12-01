import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const resetPasswordMiddleware = async (req, res, next) => {
  const { email } = req.body;
      const token = req.header("Authorization").split(" ")[1];
      if (!token) return res.status(401).json({ message: "Access denied" });
        if (!email) {
          return res.status(400).send("Email is missing ");
        }
      try {
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
      } catch (err) {
        res.status(400).json({ message: "Invalid token" });
      }


  const user = await User.findOne({ email });

  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(400).send("User not found");
  }
};

export default resetPasswordMiddleware;
