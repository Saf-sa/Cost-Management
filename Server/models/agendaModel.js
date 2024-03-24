

import mongoose from "mongoose";

// use mongoose to create a schema to define the structure of the data
const AgendaSchema = new mongoose.Schema(
  {
     incomeOwner:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,

    },
    date: {
      type: String,
      default: Date,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    duration: {
   type: [String],
      enum: [
        "15mn",
        "30mn",
        "45mn",
        "1h",
        "2h",
        "3h",
        "4h",
        "Day",
        "7 days",
        "2 weeks",
        "1 month",
      ],
      required: true,
      default: "other",
  
    },
  },
  // add timestamps to the schema to know when document was created or modified
  { timestamps: true }
);

// use mongoose to create a model from the schema and export it

const Agenda = mongoose.model("Agenda", AgendaSchema);

export default Agenda;
