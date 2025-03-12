"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("@/common/constants");
const CourseSchema = new mongoose_1.Schema({
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
        type: [mongoose_1.Schema.Types.ObjectId],
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
        enum: Object.values(constants_1.Semester),
        required: [true, "Semester is required"]
    },
    addedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const Course = (0, mongoose_1.model)('Course', CourseSchema);
exports.default = Course;
