import authMiddleware from "../middlewares/authMiddleware.js";
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
router.get("/login", authMiddleware, userLogin);
router.post("/register", registerUser);
router.get("/register", registerUser);
router.post("/reset", authMiddleware, resetLogin);
router.get("/reset", authMiddleware, resetLogin);
router.get("/", listUser);
router.put("/:id", updateUser);

export default router;
