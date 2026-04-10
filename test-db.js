const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

const testConnection = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error('MONGODB_URI is missing from backend/.env');

        console.log('Testing connection to Atlas...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
        console.log('--- SUCCESS: Your connection string is CORRECT! ---');
        process.exit(0);
    } catch (error) {
        console.error('--- ERROR: Connection Failed ---');
        console.error('Message:', error.message);
        process.exit(1);
    }
};

testConnection();
