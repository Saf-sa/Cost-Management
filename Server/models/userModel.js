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
    clothes: {
      type: String,
      default: null,
    },
    foods: {
      type: String,
      default: null,
    },
    transport: {
      type: String,
      default: null,
    },
    studies: {
      type: String,
      default: null,
    },
    invoice: {
      type: String,
      default: null,
    },
    taxes: {
      type: String,
      default: null,
    },
    hobbies: {
      type: String,
      default: null,
    },
    money: {
      type: String,
      default: null,
    },
    erpargne: {
      type: String,
      default: null,
    },
    holiday: {
      type: String,
      default: null,
    },
  },
  // add timestamps to the schema to know when document was created or modified
  { timestamps: true }
);

// use mongoose to create a model from the schema and export it

const User = mongoose.model("User", userSchema);

export default User;
