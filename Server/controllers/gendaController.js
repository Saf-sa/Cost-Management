import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

// Import expense model
import Agenda from '../models/agendaModel.js';

const addAgenda = async (req, res, next) => {
  try {
    console.log(" first test", req.body);
    const { date, name, place, duration } = req.body;

    console.log("body", req.body);

    const newAgenda = new Agenda({
      agendaOwner: req.userId,
      date,
      name,
      place,
      duration,
    });
    const result = await newAgenda.save();
    console.log(result);
    return res.json({ message: "new ggenda created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

export { registerAgenda };
