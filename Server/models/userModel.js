import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The first name is required"],
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
