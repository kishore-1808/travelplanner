const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'travel.db');
const db = new sqlite3.Database(dbPath);

const tripId = Date.now().toString();
const expenseId = (Date.now() + 1).toString();
const documentId = (Date.now() + 2).toString();
const timestamp = new Date().toISOString();

console.log('Inserting sample data into the database...');

db.serialize(() => {
  // Insert a Trip
  db.run(`INSERT INTO trips (id, name, destination, description, startDate, endDate, budget, status, createdAt) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [tripId, 'Weekend Getaway', 'Goa', 'Relaxing beach weekend.', '2026-08-10', '2026-08-15', 25000, 'upcoming', timestamp]
  );

  // Insert an Expense mapping to that Trip
  db.run(`INSERT INTO expenses (id, tripId, description, amount, category, createdAt) 
          VALUES (?, ?, ?, ?, ?, ?)`, 
    [expenseId, tripId, 'Flight Tickets', 8500, 'transport', timestamp]
  );
  
  db.run(`INSERT INTO expenses (id, tripId, description, amount, category, createdAt) 
          VALUES (?, ?, ?, ?, ?, ?)`, 
    [Date.now().toString() + '3', tripId, 'Seafood Dinner', 2000, 'food', timestamp]
  );

  // Insert a Document
  db.run(`INSERT INTO documents (id, name, type, number, expiryDate, fileName, createdAt) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`, 
    [documentId, 'Aadhaar Card', 'id', '1234-5678-9012', null, 'aadhaar.pdf', timestamp]
  );

  console.log('Data successfully inserted! Run `node backend/view-db.js` to see it.');
  db.close();
});
