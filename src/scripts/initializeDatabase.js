const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

dotenv.config();

const initializeDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'feedbacktracker',
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📦 Database: feedbacktracker`);

    // Create collections by ensuring indexes
    console.log('\n📝 Creating collections...');

    // User Collection
    await User.syncIndexes();
    console.log('✅ Users collection created/verified');

    // Feedback Collection
    await Feedback.syncIndexes();
    console.log('✅ Feedback collection created/verified');

    // Display collection info
    const userCollection = mongoose.connection.collection('users');
    const feedbackCollection = mongoose.connection.collection('feedbacks');

    const userCount = await User.countDocuments();
    const feedbackCount = await Feedback.countDocuments();

    console.log('\n📊 Database Summary:');
    console.log(`   • Users in database: ${userCount}`);
    console.log(`   • Feedback in database: ${feedbackCount}`);

    console.log('\n✨ Database initialization successful!');
    console.log('\n📋 Collections available:');
    console.log('   • users (stores user accounts and authentication)');
    console.log('   • feedbacks (stores feedback submissions)');

    await mongoose.connection.close();
    console.log('\n👋 Connection closed. Database is ready to use!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    process.exit(1);
  }
};

initializeDatabase();
