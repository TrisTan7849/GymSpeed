import Register from '../models/registerModel.js';
import bcrypt from 'bcrypt';

export async function registerUser(req, res) {
  try {
    console.log('Request Body:', req.body); 

    const { email, password, isAdmin } = req.body;
    console.log('Checking if user exists with email:', email);
    const userExists = await Register.findOne({ email });

    if (userExists) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new Register({ ...req.body, password, isAdmin });
    console.log('Creating new user:', newUser);
    await newUser.save();
    console.log('User registered successfully:', newUser);

    req.session.user = { id: newUser._id, isAdmin: newUser.isAdmin };
 
    // Rediection vers la page d'abonnements après l'inscription réussie
    res.redirect('/connexion');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
}


export async function loginUser(req, res) {
  try {
    console.log('Login Request Body:', req.body);

    const { email, password } = req.body;
    console.log('Attempting to find user with email:', email);
    const user = await Register.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      console.log('User found and authenticated:', user);

      req.session.user = { id: user._id, isAdmin: user.isAdmin };

      // Redirection vers la page admin si l'utilisateur est un administrateur,
      // sinon rediriger vers la page d'abonnement
      return res.redirect(user.isAdmin ? '/admin' : '/subscriptions');
    } else {
      console.log('Invalid credentials for email:', email);
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error });
  }
}