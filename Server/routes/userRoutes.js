import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import Expenses from "../models/expenseModel.js";
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
  isValidToken,
} from "../controllers/userController.js";

import { registerExpense } from "../controllers/ExpensesController.js";
import { registerIncome } from "../controllers/IncomesController.js";

 
// Initialize express router
const router = express.Router();

// Routes
router.post("/login", userLogin);
router.post("/register", registerUser);
router.post("/reset", resetLogin);
router.post("/password", resetPassword);
router.post("/update", updateUser);
router.put("/:id", updateUser);
router.get("/", listUser);
router.get("/verify-token",authMiddleware,isValidToken);

/* router.post("/expenses",authMiddleware, registerExpense);
router.get('/expenses',authMiddleware, async (req, res) => {
  
  try {
    const expenses = await Expenses.find({expenseOwner: req.userId});
    return res.send({ expenses });
  } catch (error) {
    return res.status(500).send("Error retrieving expenses");
  }
});

 */
// Import App routes


export default router;
