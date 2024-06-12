import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import xss from 'xss-clean'; 
import dotenv from 'dotenv';

import { router as registerRouter } from './router/registerRouter.js';
import subscriptionRouter from './router/subscriptionsRouter.js';
import adminRouter from './router/adminRouter.js';

dotenv.config();

const app = express();

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à MongoDB réussie !');
}).catch((error) => {
  console.error('Connexion à MongoDB échouée !', error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss()); 

// Configuration des sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true } //secure: true si l'application est déployée avec HTTPS.
}));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(process.cwd() + '/public'));



// Middleware pour vérifier si l'utilisateur est connecté
function isAuthenticated(req, res, next) {
    if (req.session) {
        return next();
    } else {
        res.redirect('/connexion'); 
    }
}


// Routes
app.use('/', registerRouter);

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/', subscriptionRouter);

app.use('/admin',isAuthenticated, adminRouter);

app.get('/deconnexion', (req, res) => {
  res.render('deconnexion');
});

app.get('/subscriptions', (req, res) => {
  // Vérification si l'utilisateur est connecté
  if(req.session.user) {
    res.render('subscriptions', { user: req.session.user });
  } else {
    // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
    res.redirect('/connexion');
  }
});


app.get('/connexion', (req, res) => {
  res.render('connexion');
});

app.get('/subscriptions', (req, res) => {
  res.render('subscriptions');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/machines', (req, res) => {
  res.render('machines');
});

app.get('/paiement', (req, res) => {
  res.render('paiement');
});


// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).render('404', { url: req.originalUrl });
});


app.use((err, req, res, next) => {
  console.error(err); // Log pour le débogage
  if (!req.session) {
    return res.status(500).send('Erreur de session');
  }
  // Autres cas d'erreur
  res.status(500).send('Une erreur interne est survenue');
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});