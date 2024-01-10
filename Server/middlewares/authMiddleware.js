import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = payload.id;

    // Check if user exists
    const user = await User.findById(req.userId);
    if (!user) return res.status(403).send("User does not exist");

     // Check user role
/*     if (user.role !== 'admin') return res.status(403).send("User does not have the necessary permissions"); */ // 403 Forbidden for in case of admin and user rule
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token expired");
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(400).send("Invalid Token");
    } /* else {
      return res.status(500).send("Server Error");// 500 Internal Server Error for in case of admin and user rule
    } */
  }
};

export default authMiddleware;