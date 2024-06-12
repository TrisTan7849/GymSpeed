import Machine from '../models/machinesModel.js';
import Subscription from '../models/subscriptionModel.js';
import User from '../models/registerModel.js';
import bcrypt from 'bcrypt';

// CRUD Utilisateurs
export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('Utilisateur non trouvé');
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateUser = async (req, res) => {
  
  console.log(req.body); 
  
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    
    const isAdmin = req.body.isAdmin === 'on';
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { isAdmin },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    res.json(updatedUser);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      res.status(400).send('ID invalide');
    } else {
      res.status(500).send(error.message);
    }
  }
};

export const deleteUser = async (req) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return { success: false, message: 'Utilisateur non trouvé' };
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};


// CRUD Machines
export const getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createMachine = async (req, res) => {
  try {
    const newMachine = new Machine(req.body);
    await newMachine.save();
    res.status(201).json(newMachine);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getMachineById = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) return res.status(404).send('Machine non trouvée');
    res.json(machine);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateMachine = async (req, res) => {
  try {
    const updatedMachine = await Machine.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedMachine) return res.status(404).send('Machine non trouvée');
    res.json(updatedMachine);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteMachine = async (req, res) => {
  try {
    const deletedMachine = await Machine.findByIdAndDelete(req.params.id);
    if (!deletedMachine) return res.status(404).send('Machine non trouvée');
    res.status(200).send('Machine supprimée');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
