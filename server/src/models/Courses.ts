import { Schema, model, Document } from 'mongoose';
import { ICourse } from '@/common/types/course.types';
import { Semester } from '@/common/constants';

const CourseSchema = new Schema<ICourse>({
    title: {
        type: String,
        required: true

    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        match: [/^[A-Z]{3}[0-9]{3}$/, 'Please enter a valid course code']
    },
    departments: {
        type: [Schema.Types.ObjectId],
        ref: 'Department',
        required: true
    },
    level: {
        type: Number,
        required: [true, "Level is required"],
        enum: [100, 200, 300, 400, 500]
    },
    semester: {
        type: String,
        enum: Object.values(Semester),
        required: [true, "Semester is required"]
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Course = model<ICourse>('Course', CourseSchema);

export default Course
