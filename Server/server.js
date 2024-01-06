import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import cors from "cors";

// Initialize dotenv
dotenv.config();

// Initialize express
const app = express();
const port = process.env.PORT || 5555;

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// Connect to DataBase = MongoDB
connectDB();  // This is the function we imported from Server/config/db.js



// Start the server
app.listen(port, () => {
  console.log(`Server started and running on port : ${port}`);
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/users/:_id/expenses", userRoutes);

// Routes for expenses
app.use("/api/incomes", expenseRoutes);
app.use("/api/incomes/:_id", expenseRoutes);

// Routes for incomes
app.use("/api/incomes", incomeRoutes);
app.use("/api/incomes/:_id", incomeRoutes);

// Error handler
app.use( (error, rea, res, next)=>{
error.statusCoder = error.statusCode || 500
error.message = error.message || 'Something went wrong'
res.status(error.statusCode).send(error.message)
});
