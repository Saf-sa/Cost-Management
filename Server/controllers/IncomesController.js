import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

// Import expense model
import Incomes from "../models/incomeModel.js";

const registerIncome = async (req, res, next) => {
  try {
    console.log(" first test", req.body);
    const { date, categories, label, amount } = req.body;

    console.log("body", req.body);

    const newIncome = new Incomes({
      incomeOwner: req.userId,
      date,
      categories,
      label,
      amount,
    });
    const result = await newIncome.save();
    console.log(result);
    return res.json({ message: "Income created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

export { registerIncome };
