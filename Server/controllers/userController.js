import generateToken from "../utils/generateToken.js";
import { validationResult } from "express-validator";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import hbs from "nodemailer-express-handlebars";

// Initialize dotenv
dotenv.config();
const SECRET_KEY2 = process.env.SECRET_KEY2;

// Import User model
import User from "../models/userModel.js";

// Start of userLogin
// define functions to handle requests for the user routes that we defined in Server/routes/userRoutes.js
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
     return res.status(401).json({ message: "User not registered  " });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
console.log(user.password)
  if (!isMatch) {
     return res.status(401).json({ message: "Password not match  " });
  }

  // Generate token
  const token = generateToken(user._id);
console.log(token)
  // Send response
  res.json({
    _id: user._id,
    email: user.email,
    token: token,
  });
  console.log(user)
};
//End of userLogin

// Start of registerUser
// define functions to handle requests for the user routes that we defined in Server/routes/userRoutes.js
const registerUser = async (req, res, next) => {
  try {
    console.log(" first test", req.body); // get the name, email and password from the request body
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // check if the name, email and password are not empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
  
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // check if the password is === confirmPassword 
     if (password !== confirmPassword) {
       return res.status(400).json({ message: "Confirm Password not match with Password" });
     }
     console.log('third check')
    // validate the email
    if (!validator.isEmail(email)) {
        return res.status(401).json({ message: "Email is not valid " });
    }

    // check if the email is valid
    const userExists = await User.findOne({ email });

    console.log('user exists', userExists)
    // check if the email is already in use
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // create a new user object for the user that wants to register
    const user = new User({ firstName, lastName, email, password });

    // hash the password to make it secure
    const salt = await bcrypt.genSalt(10);
    // set the user password to the hasheweb.comd password and save it
    user.password = await bcrypt.hash(password, salt);

    // save the user to the database
    const result = await user.save();
    console.log(result);

    return res.status(201).json({
      _id: result._id,
      email: result.email,
      token: generateToken(result._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
//End of registerUser

//start of resetLogin

/// Configure your transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lesafsafi@gmail.com",
    pass: SECRET_KEY2,
  },
});

const resetLogin = async (req, res) => {
  console.log("Reset login called");
  const { email } = req.body;

  console.log("Checking if user exists");
  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found");
    return res.status(401).json({ message: "Email not registered  " });
  }

  const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  user.resetCode = resetCode;
  user.resetCodeExpiry = Date.now() + 3680000;

  console.log("Saving user"); // Log to save user
  console.log(resetCode); // Log to reset code

  await user.save();

  // Send reset code to user's email
  const mailOptions = {
    from: "expense@salahsafsaf.art", // User Email Id
    to: user.email, // Recepient Email Id
    subject: "Your Code to Reset Your Password",
    html: `
      <h2>Hello ${user.firstName},</h2>
      <p>You requested a password reset. Please copy this code  ${resetCode} to reset your password:</p>
     
      <p>If you did not request a password reset, please ignore this email.</p>
    `,
  };

  console.log("Sending email");
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      res.status(500).json({ message: "Failed to send reset email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Reset code sent to your email" });
    }
  });
};
//End of resetLogin

//Start of resetPassword
const resetPassword = async (req, res) => {
  console.log("Checking if user exists");

  const { code, password, confirmPassword } = req.body;

  const user = await User.findOne({ resetCode: code });
  console.log("find user in DB ", user);

  if (!user) {
    return res.status(400).json({ message: "Invalid code" });
  }
  // Check if the reset code has expired
  if (Date.now() > user.resetCodeExpiry) {
    return res.status(400).json({ message: "Reset code has expired" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Update the user's password

  // hash the password to make it secure
  const salt = await bcrypt.genSalt(10);
  // set the user password to the hashed password and save it
  user.password = await bcrypt.hash(password, salt);

  user.resetCode = undefined;
  user.resetCodeExpiry = undefined;

  await user.save();
  console.log("new password changed", user);
  res.status(200).json({ message: "Password reset successful" });
};

//End of resetPassword

// define functions to handle requests for the user routes that we defined in Server/routes/userRoutes.js
const listUser = async (req, res) => {
  // get the token from the request header
  const token = req.header("Authorization");

  // check if the token is valid with jwt to be sure that the user is authenticated
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).send("The token is not valid!");
  }

  // get the user who made the request
  const user = await User.findById(decoded.id).select("-password");

  // get all users from the database
  try {
    const users = await User.find();
    return res.send({ user, users });
  } catch (error) {
    return res.status(500).send("Error retrieving users");
  }
};
//End of listUser

//Start of updateUser

// define functions to handle requests for the user routes that we defined in Server/routes/userRoutes.js
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the request includes a password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
    }
    // Update the user with the provided ID
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body, // Use req.body directly to update the fields
      { new: true, runValidators: true } // Ensure validators are run for updates
    ).select("-password"); // Exclude password from the response
    // If no user was found with the provided ID, return 404
    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    // Return the updated user if successful
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};
//End of updateUser
// define functions to handle requests for the user routes that we defined in Server/routes/userRoutes.js
export {
  registerUser,
  userLogin,
  listUser,
  updateUser,
  resetLogin,
  resetPassword,
};
