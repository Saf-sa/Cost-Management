import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

const userLogin = async (req, res, next) => {
  const { user } = req.body;

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
    email: user.email,
  });
};

const resetLogin = async (req, res, next) => {
  const { user } = req.body;

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

const listUser = async (req, res) => {
  const token = req.header("Authorization");

  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).send("The token is not valid!");
  }

  User.find().then((arr) => {
    return res.send(arr);
  });
};



const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the request includes a password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // Use req.body directly to update the fields
      { new: true, runValidators: true } // Ensure validators are run for updates
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

export { registerUser, userLogin, listUser, updateUser, resetLogin };
