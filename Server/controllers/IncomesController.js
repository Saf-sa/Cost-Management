import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

// Import expense model
import Incomes from "../models/incomeModel.js";

const registerIncome = async (req, res, next) => {
  try {
    console.log(" first test", req.body);
    const { date, categories, label, amount } = req.body;

    console.log("body", req.body);

    const newIncome = new Incomes({
      incomeOwner: req.userId,
      date,
      categories,
      label,
      amount,
    });
    const result = await newIncome.save();
    console.log(result);
    return res.json({ message: "Income created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

// Méthode pour récupérer les incomes en fonction d'une plage de dates spécifique
const getIncomesByDate = async (req, res, next) => {
  try {
    const { start_date, end_date } = req.query;

    // Vérifier si les dates de début et de fin sont spécifiées
    if (!start_date || !end_date) {
      return res.status(400).send({ message: "Les dates de début et de fin sont requises" });
    }

    // Convertir les dates en objets Date
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Récupérer les incomes dans la plage de dates spécifiée depuis la base de données
    const incomes = await Incomes.find({
      date: { $gte: startDate, $lte: endDate },
      incomeOwner: req.userId
    });

    // Envoyer les incomes récupérés en réponse
    res.json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

// Méthode pour récupérer les incomes en fonction de la catégorie
const getIncomesByCategory = async (req, res, next) => {
  try {
    // Logique pour récupérer les incomes en fonction de la catégorie...
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};


export { registerIncome, getIncomesByDate, getIncomesByCategory };
