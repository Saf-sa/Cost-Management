import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const userLogin = async (req, res, next) => {
  const { user } = req;

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
};


