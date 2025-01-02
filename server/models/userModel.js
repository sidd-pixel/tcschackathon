// models/userModel.js
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const uri = process.env.MONGODB_URI;
let client;
let db;

async function connectToDatabase() {
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('testdb'); // Replace with your database name
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

async function getUsers() {
  const usersCollection = db.collection('users');
  return await usersCollection.find({}).toArray();
}

async function getUserById(id) {
  const usersCollection = db.collection('users');
  return await usersCollection.findOne({ _id: new ObjectId(id) });
}

async function createUser(user) {
  const usersCollection = db.collection('users');
  const result = await usersCollection.insertOne(user);
  return result.insertedId;
}

async function updateUser(id, userData) {
  const usersCollection = db.collection('users');
  const result = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: userData }
  );
  return result.modifiedCount;
}

async function deleteUser(id) {
  const usersCollection = db.collection('users');
  const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}

module.exports = {
  connectToDatabase,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
