import express from 'express';
import Subscription from '../models/subscriptionModel.js';

const router = express.Router();

// Route pour la sélection d'un abonnement
  router.post('/choose-subscription', async (req, res) => {
  if (!req.session.user) {
    // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
    return res.redirect('/connexion');
  }

  try {
    const { subscriptionType } = req.body;
    const userId = req.session.user.id;


    // Création nouvel abonnement
    const newSubscription = new Subscription({
      userId: userId,
      type: subscriptionType
    });

    await newSubscription.save();

    // Mise à jour session utilisateur
    req.session.user.subscription = subscriptionType;

    // Redirection vers abonnements
    res.redirect('/subsciprtions');
  } catch (error) {
    console.error('Error in subscription selection:', error);
    res.status(500).send('An error occurred');
  }
  router.get('/subsciprtions', (req, res) => {
  
  if (req.session.user && req.session.user.subscription) {
    res.render('utilisateur', { user: req.session.user });
  } else {
    // Redirection vers la page de connexion ou abonnement si l'utilisateur n'est pas connecté ou n'a pas choisi d'abonnement
    res.redirect('/connexion');
  }
});
router.get('/utilisateur', (req, res) => {
  // Assure que l'utilisateur est connecté
  if (req.session.user) {
    // Récupére les informations supplémentaires si nécessaire
    res.render('utilisateur', { user: req.session.user });
  } else {
    // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
    res.redirect('/connexion');
  }
});
});

export default router;
