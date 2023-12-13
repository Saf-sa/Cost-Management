import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();
const SECRET_KEY2 = process.env.SECRET_KEY2;

mongoose.connect("mongodb://localhost:27017/your-database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/incomes", incomesController.getIncomes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
