import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5555;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server started and running on port : ${port}`);
});

app.use("/api/users", userRoutes);

app.use ( (error, rea, res, next)=>{
error.statusCoder = error.statusCode || 500
error.message = error.message || 'Something went wrong'
res.status(error.statusCode).send(error.message)
});
