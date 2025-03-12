import { BookCategory } from '@/common/constants';
import { IBook } from '@/common/types';
import { extractDriveFileId } from '@/common/utils';
import { Schema, model, Document } from 'mongoose';


const bookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, "The book title is required"]
    },
    driveUrl: {
        type: String,
        required: [true, "Google drive link is required"],
        validate: {
            validator: function (v: string) {
                return v.includes("drive.google.com");
            },
            message: "Invalid Google Drive link"
        },
    },

    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    category: {
        type: String,
        enum: Object.values(BookCategory),
        default: BookCategory.TextBook
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

bookSchema.virtual("previewUrl").get(function () {
    const driveFileId = extractDriveFileId(this.driveUrl);
    return `https://drive.google.com/file/d/${driveFileId}/preview`;
});

bookSchema.virtual("downloadUrl").get(function () {
    const driveFileId = extractDriveFileId(this.driveUrl);
    return `https://drive.google.com/uc?export=download&id=${driveFileId}`;

});
const Book = model<IBook>('Book', bookSchema);

export default Book;
