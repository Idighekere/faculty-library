import mongoose from "mongoose";
import { Semester } from "../constants";
import { Require_id } from "mongoose";
import { IUser } from "./user.types";

export interface ICourse extends Document {
    title: string;
    courseCode: string;
    departments: [mongoose.Types.ObjectId];
    level: number;
    semester: Semester;
    addedBy: Require_id<IUser>
}
