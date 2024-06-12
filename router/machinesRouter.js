import express from "express";
import machinesController from "../controllers/machinesController.js";
import { createMachine } from '../controllers/machinesController.js';

const router = express.Router();

// Créer une machine
router.post('/machines', (req, res, next) => {
  const machine = new machine ({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category
  });
 machine.save((err, savedMachine) => {
    if (err) {
      return next(err);
    }
    res.json(savedMachine);
  });
});

router.post('/machines', createMachine);

export default router;