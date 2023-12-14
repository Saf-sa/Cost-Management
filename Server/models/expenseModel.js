import mongoose from "mongoose";



// use mongoose to create a schema to define the structure of the data
const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    categories: {
        type: String,
        enum: ["house",
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
        "other"],
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
    date: {
          type: Date,
          required: true,
      },
            
  },
  // add timestamps to the schema to know when document was created or modified
  { timestamps: true }
);

// use mongoose to create a model from the schema and export it

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
