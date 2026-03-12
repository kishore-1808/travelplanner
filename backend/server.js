const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const { Trip, Expense, Document } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
// Increase payload limit for Base64 documents
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- TRIPS API ---

// Get all trips
app.get('/api/trips', async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    // Map _id back to id for frontend compatibility
    res.json(trips.map(trip => ({ ...trip.toObject(), id: trip._id.toString() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a trip
app.post('/api/trips', async (req, res) => {
  try {
    const { name, destination, description, startDate, endDate, budget, imageUrl, status, createdAt } = req.body;
    
    const newTrip = new Trip({
      name, destination, description, startDate, endDate, budget, imageUrl, status, createdAt
    });

    const savedTrip = await newTrip.save();
    res.json({ ...savedTrip.toObject(), id: savedTrip._id.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a trip
app.put('/api/trips/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, destination, description, startDate, endDate, budget, imageUrl, status } = req.body;
    
    // Using findByIdAndUpdate
    const updatedTrip = await Trip.findByIdAndUpdate(
      id, 
      { name, destination, description, startDate, endDate, budget, imageUrl, status },
      { new: true } // Return updated doc
    );

    if (!updatedTrip) return res.status(404).json({ error: 'Trip not found' });
    res.json({ updated: 1, ...updatedTrip.toObject(), id: updatedTrip._id.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a trip
app.delete('/api/trips/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrip = await Trip.findByIdAndDelete(id);
    if (!deletedTrip) return res.status(404).json({ error: 'Trip not found' });
    
    // Also explicitly delete expenses connected to it
    await Expense.deleteMany({ tripId: id });
    
    res.json({ deleted: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- EXPENSES API ---

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses.map(exp => ({ ...exp.toObject(), id: exp._id.toString(), tripId: exp.tripId.toString() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { tripId, description, amount, category, createdAt } = req.body;
    
    const newExpense = new Expense({
      tripId, description, amount, category, createdAt
    });

    const savedExpense = await newExpense.save();
    res.json({ ...savedExpense.toObject(), id: savedExpense._id.toString(), tripId: savedExpense.tripId.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ deleted: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DOCUMENTS API ---

// Get all documents
app.get('/api/documents', async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs.map(doc => ({ ...doc.toObject(), id: doc._id.toString() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a document
app.post('/api/documents', async (req, res) => {
  try {
    const { name, type, number, expiryDate, fileData, fileName, createdAt } = req.body;
    
    const newDoc = new Document({
      name, type, number, expiryDate, fileData, fileName, createdAt
    });

    const savedDoc = await newDoc.save();
    
    // Omit heavy fileData from standard POST response just like SQL version
    const responseData = { ...savedDoc.toObject(), id: savedDoc._id.toString() };
    delete responseData.fileData;
    
    res.json(responseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a document
app.delete('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoc = await Document.findByIdAndDelete(id);
    if (!deletedDoc) return res.status(404).json({ error: 'Document not found' });
    res.json({ deleted: 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
