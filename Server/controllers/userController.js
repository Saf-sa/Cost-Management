import generateToken from "../utils/generateToken.js";
import { validationResult } from "express-validator";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";


// Import User model
import User from "../models/userModel.js";

// define functions to handle requests for the user routes that we defined in Server/routes/userRoutes.js
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate token
  const token = generateToken(user._id);

  // Send response
  res.json({
    _id: user._id,
    email: user.email,
    token: token,
  });
};

// define functions to handle requests for the user routes that we defined in Server/routes/userRoutes.js
const registerUser = async (req, res, next) => {
  try {
    console.log("test")   // get the name, email and password from the request body
    const { firstName, lastName, email, password } = req.body;

    // check if the name, email and password are not empty
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // validate the email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // check if the email is valid
    const userExists = await User.findOne({ email });

    // check if the email is already in use
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // create a new user object for the user that wants to register
    const user = new User({ firstName, lastName, email, password });

    // hash the password to make it secure
    const salt = await bcrypt.genSalt(10);
    // set the user password to the hashed password and save it
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
// Configure your transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});
/// define functions to handle requests for the user routes that we defined in Server/routes/userRoutes.js
const resetLogin = async (req, res, next) => {
  const { email } = req.body;
}
  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  // Generate reset token and expiry time
  const resetToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  user.resetToken = resetToken;
  user.resetTokenExpire = Date.now() + 3600000; // Token expires in 1 hour

  await user.save();

  // Send reset email
  const resetUrl = `http://my-frontend-url/reset-password?token=${resetToken}`;

const mailOptions = {
  from: "expense@salahsafsaf.art", // User Email Id
  to: user.email, // Recepient Email Id
  subject: "Password Reset",
  html: `
    <h2>Hello ${user.firstName},</h2>
    <p>You requested a password reset. Please click on the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
  `,
};

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

// define functions to handle requests for the user routes that we defined in Server/routes/userRoutes.js
export { registerUser, userLogin, listUser, updateUser, resetLogin,  };
