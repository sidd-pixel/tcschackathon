// controllers/userController.js
const userModel = require('../models/userModel');

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await userModel.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get users' });
  }
}

// Get a user by ID
async function getUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get user' });
  }
}

// Create a new user
async function createUser(req, res) {
  const { name, age, city } = req.body;
  const newUser = { name, age, city };
  try {
    const userId = await userModel.createUser(newUser);
    res.status(201).json({ message: 'User created', id: userId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user' });
  }
}

// Update a user by ID
async function updateUser(req, res) {
  const userId = req.params.id;
  const { name, age, city } = req.body;
  const updatedUser = { name, age, city };
  try {
    const modifiedCount = await userModel.updateUser(userId, updatedUser);
    if (modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or nothing to update' });
    }
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user' });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const deletedCount = await userModel.deleteUser(userId);
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
