import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import Incomes from "../models/incomeModel.js";


// Import userController

import { registerIncome } from "../controllers/IncomesController.js";
 
// Initialize express router
const router = express.Router();

// Routes

router.post("/",authMiddleware, registerIncome, );
router.get("/:category", authMiddleware, async (req, res) => {
           /* "/:category" */
  try {

        if (req.params.category === "all") {
      const incomes = await Incomes.find({incomeOwner: req.userId});
           console.log('expenses send from Backend',incomes)  
      return res.send({ incomes });
    }
    
        else{
      const category = req.params.category;
      const incomes = await Incomes.find({incomeOwner: req.userId, categories: category[0].toUpperCase()+category.slice(1)});
      return res.send({ incomes });
console.log('Incomes send from Backend',incomes)
    } 

/*     const incomes = await Incomes.find({incomeOwner: req.userId});
    return res.send({ incomes,  }); */
    /*     console.log('incomes send from Backend', incomes) */
  }
   catch (error) {
    return res.status(500).send("Error retrieving incomes and expenses data");
  }
});


 
export default router;
