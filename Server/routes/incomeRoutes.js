import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import Expenses from "../models/expenseModel.js";
import resetPasswordMiddleware from "../middlewares/resetPasswordMiddleware.js";
const route = express.Router();

// Import userController

import { registerIncome } from "../controllers/IncomesController.js";

 
// Initialize express router
const router = express.Router();

// Routes

router.post("/incomes",authMiddleware, registerIncome);
router.get("/incomes", authMiddleware, async (req, res) => {
  try {
    const incomes = await incomes.find();
    return res.send({ incomes });
  } catch (error) {
    return res.status(500).send("Error retrieving incomes");
  }
});




// Import App routes


export default router;
