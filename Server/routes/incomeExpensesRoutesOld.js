import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import Incomes from "../models/incomeModel.js";


// Import userController

import { registerIncome } from "../controllers/IncomesController.js";
/* import { registerExpense} from "../controllers/ExpensesController.js"; */
import Expenses from "../models/expenseModel.js";
// Initialize express router
const router = express.Router();

// Routes

router.post("/",authMiddleware, registerIncome, registerExpense );
router.get("/:category", authMiddleware, async (req, res) => {
           /* "/:category" */
  try {

        if (req.params.category === "total") {
      const incomes = await Incomes.find({incomeOwner: req.userId});
           console.log('incomes send from Backend',incomes)  
         const expenses = await expenses.find({expenseOwner: req.userId});
           console.log('expenses send from Backend',expenses)  
      return res.send({ incomes, expenses });
    }
    
        else{
      const category = req.params.category;
      const incomes = await Incomes.find({incomeOwner: req.userId, categories: category[0].toUpperCase()+category.slice(1)});
       const expenses = await Expenses.find({expensesOwner: req.userId, categories: category[0].toUpperCase()+category.slice(1)});
      return res.send({ incomes, expenses });
console.log('Incomes & Expenses send from Backend',incomes , expenses)
    } 


  }
   catch (error) {
    return res.status(500).send("Error retrieving incomes and expenses data");
  }
});


 
export default router;
