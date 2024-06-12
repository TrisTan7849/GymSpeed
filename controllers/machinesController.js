import machines from "../models/machines.js"

// Fonction pour créer une nouvelle machine
export const createMachine = async (req, res, next) => {
  try {
    const { name, description, category } = req.body;
    const machine = new machine({ name, description, category });
    const savedMachine = await machine.save();
    res.status(201).json(savedMachine);
  } catch (err) {
    next(err);
  }
};