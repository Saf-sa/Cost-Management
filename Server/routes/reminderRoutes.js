import express from 'express';
import { addReminder } from "../controllers/reminderController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import Agenda from '../models/reminderModel.js';

import { get } from 'mongoose';
import Reminder from '../models/reminderModel.js';

// Initialize express router
const router = express.Router();

// Routes

// Route to create a new agenda
router.post("/", authMiddleware, addReminder);

// Route to get all agendas for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const reminders = await Reminder.find({agendaOwner: req.userId});
    return res.send({ reminders });
  } catch (error) {
    return res.status(500).send("Error retrieving agendas");
  }
});

// Route to get a specific agenda by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    if (!reminder) {
      return res.status(404).send("Agenda not found");
    }
    return res.send({ reminder });
  } catch (error) {
    return res.status(500).send("Error retrieving agenda");
  }
});

export default router;