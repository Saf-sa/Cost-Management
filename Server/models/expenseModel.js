import mongoose from "mongoose";



// use mongoose to create a schema to define the structure of the data
const expensesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: Date,
      required: true,
    },
    categories: {
      type: String,
      enum: [
        "house",
        "clothes",
        "foods",
        "transport",
        "studies",
        "invoice",
        "taxes",
        "hobbies",
        "money",
        "erpargne",
        "holiday",
        "other",
      ],
      required: true,
      default: "other",
    },

    otherCategories: {
      type: String,
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
