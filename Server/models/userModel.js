import mongoose from "mongoose";
import resetPasswordMiddleware from "../middlewares/resetPasswordMiddleware.js";

// use mongoose to create a schema to define the structure of the data
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "The first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "The last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
    },
    resetCode: {
      type: String,
      default: null,
    },
    resetCodeExpiry: {
      type: Date,
      default: Date.now,
    },
    /*  role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }, */
  },
  // add timestamps to the schema to know when document was created or modified
  { timestamps: true }
);

// use mongoose to create a model from the schema and export it

const User = mongoose.model("User", userSchema);

export default User;