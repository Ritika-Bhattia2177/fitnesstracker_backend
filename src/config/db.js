const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB || 'feedbacktracker',
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log(`Using database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
