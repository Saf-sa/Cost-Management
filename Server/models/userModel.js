import mongoose from "mongoose";

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
      minLength: 4,
    },
    resetCode: {
      type: String,
      required: [true, "Code is required"],
      minLength: 6,
    },
    resetCodeExpiry: {
      type: Date,
      required: [true, "Code expiry is required"],
    },
    id: {
      type: String,
    },
  },
  // add timestamps to the schema to know when document was created or modified
  { timestamps: true }
);

// use mongoose to create a model from the schema and export it
const User = mongoose.model("User", userSchema);

export default User;
