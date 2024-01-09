import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import Expenses from "../models/expenseModel.js";


// Import userController

import { registerExpense } from "../controllers/ExpensesController.js";

 
// Initialize express router
const router = express.Router();

// Routes

router.post("/",authMiddleware, registerExpense);
router.get("/:category",authMiddleware, async (req, res) => {
  
  try {
    if (req.params.category === "all") {
      const expenses = await Expenses.find({expenseOwner: req.userId});
  /*      console.log('expenses send from Backend',expenses)  */
      return res.send({ expenses });
    }

    else{
      const category = req.params.category;
      const expenses = await Expenses.find({expenseOwner: req.userId, categories: category[0].toUpperCase()+category.slice(1)});
      return res.send({ expenses });
console.log('expenses send from Backend',expenses)
    }
  } catch (error) {
    return res.status(500).send("Error retrieving expenses");
  }
});


export default router;
