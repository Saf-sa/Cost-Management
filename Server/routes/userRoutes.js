import authMiddleware from "../middlewares/authMiddleware.js";
import resetPasswordMiddleware from "../middlewares/resetPasswordMiddleware.js";
import express from "express";

// Import userController
import {
  registerUser,
  userLogin,
  listUser,
  updateUser,
  resetLogin,
} from "../controllers/userController.js";

// Initialize express router
const router = express.Router();

// Routes
router.post("/login", authMiddleware, userLogin);
router.post("/register", registerUser);
router.post("/reset", resetPasswordMiddleware, resetLogin);
router.put("/:id", updateUser);


export default router;
