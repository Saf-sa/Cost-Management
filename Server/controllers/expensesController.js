import dotenv from "dotenv";


// Initialize dotenv
dotenv.config();


// Import expense model
import Expenses from "../models/expenseModel.js";

const registerExpense = async (req, res, next) => {
  try {
    console.log(" first test", req.body);
    const { date, categories, otherCategories, label, amount } = req.body;

    //check if the userId, categories, amount and date are not empty
   /*  if (!date || !categories || !otherCategories || !label || !amount) {
      return res.status(400).json({ message: "Please fill all the fields" });
    } */
   
    const newExpense = new Expenses({
      date,
      categories,
      otherCategories,
      label,
      amount,
    });
    const result = await newExpense.save();
    console.log(result);
    return  res.json({ message: "Expense created successfully" });
  } 
  catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }

};

export { registerExpense };

