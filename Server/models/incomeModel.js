import mongoose from "mongoose";

// use mongoose to create a schema to define the structure of the data
const incomesSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      default: Date,
      required: true,
    },
    categories: {
      type: String,
      enum: [
        "Salary",
        "Taxes refund",
        "Bonus",
        "Loan",
        "Sales",
        "Gift",
        "Rent",
        "Allowance",
        "Refund",
        "Gambling",
        "Stocks",
        "Other",

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

const Incomes = mongoose.model("Incomes", incomesSchema);

export default Incomes;
