

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
      type: String,
      required: true,
    },
  },
  // add timestamps to the schema to know when document was created or modified
  { timestamps: true }
);

// use mongoose to create a model from the schema and export it

const Agenda = mongoose.model("Agenda", AgendaSchema);

export default Agenda;
