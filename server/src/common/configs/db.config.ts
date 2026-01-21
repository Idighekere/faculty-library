import mongoose from 'mongoose';
import { ENVIRONMENT } from './environment.config';

const uri = ENVIRONMENT.DB.URI || 'mongodb://localhost:27017/faculty-library';

export const connectToDatabase = async ():Promise<void> => {
    try {
        const connection=await mongoose.connect(uri);
        console.log(`Connected to MongoDB at ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1)
        // throw error;
    }
};
