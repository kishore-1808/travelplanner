const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

// Connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://ramesh:hQXuK4xMnOqeySBT@ac-ijh7ggh-shard-00-00.xykaksu.mongodb.net:27017,ac-ijh7ggh-shard-00-01.xykaksu.mongodb.net:27017,ac-ijh7ggh-shard-00-02.xykaksu.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority";
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      family: 4 // Force IPv4 to avoid localhost IPv6 issues with mongod
    });
    console.log(`Connected to MongoDB database: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
