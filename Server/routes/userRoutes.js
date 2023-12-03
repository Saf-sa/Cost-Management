import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import resetPasswordMiddleware from "../middlewares/resetPasswordMiddleware.js";
const route = express.Router();

// Import userController
import {
  registerUser,
  userLogin,
  resetPassword,
  listUser,
  updateUser,
  resetLogin,
} from "../controllers/userController.js";

// Initialize express router
const router = express.Router();

// Routes
router.post("/login", authMiddleware, userLogin);
router.post("/register", registerUser);
router.post("/reset", resetLogin);
router.post("/password", resetPassword);
router.post("/update", updateUser);
router.put("/:id", updateUser);
router.get("/", listUser);


export default router;
