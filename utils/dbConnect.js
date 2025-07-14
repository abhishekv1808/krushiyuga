const mongoose = require('mongoose');

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
            // Add these settings for better connection handling
            socketTimeoutMS: 45000,
            maxPoolSize: 10
        };

        const db = await mongoose.connect(process.env.MONGODB_URI, opts);
        cachedDb = db;
        console.log('New database connection established');
        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

module.exports = { connectToDatabase };
