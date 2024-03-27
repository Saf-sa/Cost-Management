import dotenv from "dotenv";
import Reminder from '../models/reminderModel.js';


// Initialize dotenv
dotenv.config();

const addReminder = async (req, res, next) => {
  try {
    console.log(" first test", req.body);
    const { startDate, expireDate, contractName, selectedLabel, selectedEmail } = req.body;

    console.log("body", req.body);

    const newReminder = new Reminder({
      reminderOwner: req.userId,
      startDate,
      expireDate,
      contractName,
      selectedLabel,
      selectedEmail,
    });
    const result = await newReminder.save();
    console.log(result);
    return res.json({ message: "new reminder created successfully" });
  } catch (error) {
    console.log(error);
     if (error instanceof ValidationError) {
      // handle validation errors
      return res.status(400).send({ error: error.message });
    }
      return res.status(500).send({ error: 'An unexpected error occurred' });
  }
};

export { addReminder };
