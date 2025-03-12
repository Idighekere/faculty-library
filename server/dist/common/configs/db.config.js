"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_config_1 = require("./environment.config");
const uri = environment_config_1.ENVIRONMENT.DB.URI || 'mongodb://localhost:27017/faculty-library';
const connectToDatabase = async () => {
    try {
        const connection = await mongoose_1.default.connect(uri);
        console.log(`Connected to MongoDB at ${connection.connection.host}`);
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
        // throw error;
    }
};
exports.connectToDatabase = connectToDatabase;
