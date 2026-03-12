const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'travel.db');
const db = new sqlite3.Database(dbPath);

console.log('--- DATABASE CONTENTS ---');

db.serialize(() => {
  // 1. View all trips
  db.all('SELECT * FROM trips', [], (err, rows) => {
    if (err) console.error(err);
    console.log('\n🧳 TRIPS:');
    if (rows.length === 0) console.log('  No trips found.');
    rows.forEach(row => {
      console.log(`  - [${row.id}] ${row.name || row.destination} | ${row.startDate} to ${row.endDate} | Budget: ₹${row.budget}`);
    });
  });

  // 2. View all expenses
  db.all('SELECT * FROM expenses', [], (err, rows) => {
    if (err) console.error(err);
    console.log('\n💸 EXPENSES:');
    if (rows.length === 0) console.log('  No expenses found.');
    rows.forEach(row => {
      console.log(`  - [${row.id}] Trip ID: ${row.tripId} | ${row.description} | ₹${row.amount} | Category: ${row.category}`);
    });
  });

  // 3. View all documents
  db.all('SELECT id, name, type, number, expiryDate, fileName FROM documents', [], (err, rows) => {
    if (err) console.error(err);
    console.log('\n📄 DOCUMENTS:');
    if (rows.length === 0) console.log('  No documents found.');
    rows.forEach(row => {
      console.log(`  - [${row.id}] ${row.name} (${row.type}) | File: ${row.fileName || 'none'}`);
    });
    
    // Close cleanly
    db.close();
  });
});
