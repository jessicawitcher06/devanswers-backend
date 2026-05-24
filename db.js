import mongoose from 'mongoose';

const MONGO_OPTIONS = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    heartbeatFrequencyMS: 10000,
};

export async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, MONGO_OPTIONS);
        console.log('MongoDB connected');

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected — reconnecting...');
            setTimeout(() => {
                mongoose.connect(process.env.MONGODB_URI, MONGO_OPTIONS)
                    .then(() => console.log('MongoDB reconnected'))
                    .catch((err) => console.error('MongoDB reconnect failed:', err));
            }, 3000);
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export async function disconnectFromDB() {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
}