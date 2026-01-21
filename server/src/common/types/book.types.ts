import mongoose from "mongoose";
import { BookCategory } from "../constants";

export interface IBook extends Document {
    title: string;
    driveUrl: string;
    course: mongoose.Types.ObjectId;
    category:BookCategory;
    uploadedBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
