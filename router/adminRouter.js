import express from 'express';
import { createUser, getUserById, getAllUsers, updateUser, deleteUser } from '../controllers/adminController.js';
import { createMachine, getMachineById, getAllMachines, updateMachine, deleteMachine } from '../controllers/adminController.js';
import User from '../models/registerModel.js';

const router = express.Router();

// Routes pour les utilisateurs
router.get('/', checkAdmin, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.render('admin', { users });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).send('Erreur serveur');
  }
});

router.get('/create', checkAdmin,  (req, res) => {
  res.render('create');
});

// Modifier un utilisateur
router.get('/users/edit/:id', checkAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.render('edit', { user });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    res.status(500).send('Erreur serveur');
  }
});

router.post('/users/edit/:id', checkAdmin, updateUser);

// Supprimer un utilisateur
router.get('/users/delete/:id', checkAdmin, async (req, res) => {
  try {
    const result = await deleteUser(req);

    if (!result.success) {
      console.error("Erreur lors de la suppression de l'utilisateur:", result.message);
      return res.status(404).send(result.message);
    }

    res.redirect('/admin'); 
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    res.status(500).send('Erreur serveur');
  }
});


// Route pour la déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      console.error("Erreur lors de la déconnexion:", err);
      return res.status(500).send('Erreur serveur lors de la déconnexion');
    }
    res.redirect('/deconnexion');
  });
});


// Middleware pour vérifier si l'utilisateur est administrateur
function checkAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
    next();
  } else {
    res.status(403).send('Accès refusé');
  }
}


router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


// Routes pour les machines
router.get('/machines', getAllMachines);
router.post('/machines', createMachine);
router.get('/machines/:id', getMachineById);
router.put('/machines/:id', updateMachine);
router.delete('/machines/:id', deleteMachine);

export default router;
