import express from 'express';
import { addAgenda } from "../controllers/agendaController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import Agenda from '../models/agendaModel.js';


// Initialize express router
const router = express.Router();

// Routes

// Route to create a new agenda
router.post("/", authMiddleware, addAgenda);

// Route to get all agendas for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const agendas = await Agenda.find({agendaOwner: req.userId});
    return res.send({ agendas });
  } catch (error) {
    return res.status(500).send("Error retrieving agendas");
  }
});

// Route to get a specific agenda by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id);
    if (!agenda) {
      return res.status(404).send("Agenda not found");
    }
    return res.send({ agenda });
  } catch (error) {
    return res.status(500).send("Error retrieving agenda");
  }
});

export default router;