import User from "../models/userModel.js";
import Expenses from "../models/expenseModel.js";
import matchPassword from "../utils/matchPassword.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const authMiddleware = async (req, res, next) => {

  console.log(req.headers.authorization)
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = payload.id;
    next();
  }

  catch (err) {
    res.status(400).send("Invalid Token");
  }
};

export default authMiddleware;
