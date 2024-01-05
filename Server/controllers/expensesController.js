import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

// Import expense model
import Expenses from "../models/expenseModel.js";

const registerExpense = async (req, res, next) => {
  try {
    console.log(" first test", req.body);
    const { date, categories, label, amount } = req.body;

    console.log("body", req.body);

    const newExpense = new Expenses({
      expenseOwner: req.userId,
      date,
      categories,
      label,
      amount,
    });
    const result = await newExpense.save();
    console.log(result);
    return res.json({ message: "Expense created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

export { registerExpense };
