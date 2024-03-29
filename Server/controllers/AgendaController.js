import dotenv from "dotenv";
import Agenda from '../models/agendaModel.js';

// Initialize dotenv
dotenv.config();

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
    return res.json({ message: "new Agenda created successfully" });
  } catch (error) {
    console.log(error);
    if (error.message.includes('Agenda validation failed')) 
    {
      return res.status(400).send({ error: error.message });
    }
      return res.status(500).send({ error: 'An unexpected error occurred' });
  }
};

export { addAgenda };
