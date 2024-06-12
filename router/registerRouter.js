import express from 'express';
import register from '../models/registerModel.js';
import { registerUser, loginUser } from '../controllers/registerController.js';

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register'); 
});

router.post('/register', registerUser);
router.post('/connexion', loginUser);

export { router };
