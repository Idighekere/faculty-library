"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@/common/constants");
const utils_1 = require("@/common/utils");
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "The book title is required"]
    },
    driveUrl: {
        type: String,
        required: [true, "Google drive link is required"],
        validate: {
            validator: function (v) {
                return v.includes("drive.google.com");
            },
            message: "Invalid Google Drive link"
        },
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    category: {
        type: String,
        enum: Object.values(constants_1.BookCategory),
        default: constants_1.BookCategory.TextBook
    },
    uploadedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
bookSchema.virtual("previewUrl").get(function () {
    const driveFileId = (0, utils_1.extractDriveFileId)(this.driveUrl);
    return `https://drive.google.com/file/d/${driveFileId}/preview`;
});
bookSchema.virtual("downloadUrl").get(function () {
    const driveFileId = (0, utils_1.extractDriveFileId)(this.driveUrl);
    return `https://drive.google.com/uc?export=download&id=${driveFileId}`;
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.default = Book;
