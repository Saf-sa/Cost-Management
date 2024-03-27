import mongoose from "mongoose";

// use mongoose to create a schema to define the structure of the data
const ReminderSchema = new mongoose.Schema(
  {
     reminderOwner:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,

    },
    startDate: {
      type: String,
      default: Date,
      required: true,
    },

    expireDate: {
      type: String,
      default: Date,
      required: true,
    },
    contractName: {
      type: String,
      required: true,
    },
     selectedLabel: {
      type: String,
      required: true,
    },
        selectedEmail: {
      type: String,
      required: true,
    },
  
  },
  // add timestamps to the schema to know when document was created or modified
  { timestamps: true }
);

// use mongoose to create a model from the schema and export it

const Reminder = mongoose.model("Reminder", ReminderSchema);

export default Reminder;
