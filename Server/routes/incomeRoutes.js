import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import Incomes from "../models/incomeModel.js";


// Import userController

import { registerIncome } from "../controllers/IncomesController.js";
 
// Initialize express router
const router = express.Router();

// Routes

router.post("/",authMiddleware, registerIncome, );
router.get("/", authMiddleware, async (req, res) => {
  try {
   
    const incomes = await Incomes.find({incomeOwner: req.userId});
    return res.send({ incomes,  });
    /*     console.log('incomes send from Backend', incomes) */
  } catch (error) {
    return res.status(500).send("Error retrieving incomes and expenses data");
  }
});


 
export default router;
