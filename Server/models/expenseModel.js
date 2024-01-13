import mongoose from "mongoose";



// use mongoose to create a schema to define the structure of the data
const expensesSchema = new mongoose.Schema(
  {
    expenseOwner:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,

    },
    date: {
      type: String,
      default: Date.now,
      required: true,
    },
    categories: {
      type: [String],
      enum: [
        "Clothe",
        "Food",
        "Transport",
        "Studie",
        "Holiday",
        "Tax",
        "Hobbie",
        "MyEpargne",
        "Money",
       "epargne",
        "Other",
      ],
      required: true,
      default: "other",
  
    },

    label: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  // add timestamps to the schema to know when document was created or modified
  { timestamps: true }
);

// use mongoose to create a model from the schema and export it

const Expenses = mongoose.model("Expenses", expensesSchema);

export default Expenses;
