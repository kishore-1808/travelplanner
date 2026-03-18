const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

// Trip Schema
const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String },
  startDate: { type: String }, // Storing as String to match frontend YYYY-MM-DD format easily
  endDate: { type: String },
  budget: { type: Number },
  imageUrl: { type: String },
  status: { type: String, default: 'upcoming' },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

// Expense Schema
const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, default: 'other' },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

// Document Schema
const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, default: 'other' },
  number: { type: String },
  expiryDate: { type: String },
  fileData: { type: String }, // Base64 encoded string
  fileName: { type: String },
  createdAt: { type: String, default: () => new Date().toISOString() }
});

const User = mongoose.model('User', userSchema);
const Trip = mongoose.model('Trip', tripSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Document = mongoose.model('Document', documentSchema);

module.exports = {
  User,
  Trip,
  Expense,
  Document
};
