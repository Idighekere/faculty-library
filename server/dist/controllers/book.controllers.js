"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.getBooksByUser = exports.addBook = exports.getBooksByCourse = void 0;
const utils_1 = require("@/common/utils");
const middlewares_1 = require("@/middlewares");
const models_1 = require("@/models");
const getBooksByCourse = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { courseCode } = req.params;
    if (!courseCode) {
        return next(new utils_1.ErrorResponse("Course parameter is required", 400));
    }
    // const books = await Book.find({ category:"textBook"}).populate('course');
    // const books = await Book.find({ "course": courseId }).populate({
    //     path:'course',
    //     select:"title courseCode"
    // }).lean().exec();
    const books = await models_1.Book.aggregate([
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'course',
            },
        },
        {
            $match: { 'course.courseCode': courseCode }
        },
        // {
        //     $unwind: '$course',
        // },
        {
            $project: {
                title: 1,
                driveUrl: 1,
                previewUrl: 1,
                downloadUrl: 1,
                category: 1,
                'course.title': 1,
                'course.courseCode': 1
            }
        }
    ], { includeVirtuals: true }).exec();
    // if (!book) {
    //     return next(new ErrorResponse("Book not found", 404))
    // }
    (0, utils_1.SuccessResponse)(res, 200, books, "success");
});
exports.getBooksByCourse = getBooksByCourse;
const addBook = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { title, driveUrl, courseCode, category } = req.body;
    if (!title || !driveUrl || !courseCode || !category) {
        return next(new utils_1.ErrorResponse("All fields are required", 400));
    }
    const course = await models_1.Course.findOne({ courseCode });
    if (!course) {
        return next(new utils_1.ErrorResponse("Course not found. The course must be added by an admin before", 404));
    }
    const book = await models_1.Book.create({ title, driveUrl, course: course._id, category, uploadedBy: req?.user._id });
    // const bookResponse = {
    //     title:book.title,
    //     driveUrl:book.driveUrl,
    //     course:{
    //         title:book.course.title as any,
    //         courseCode:book.course.courseCode as any
    //     },
    //     category:book.category
    // }
    (0, utils_1.SuccessResponse)(res, 201, book, "Book added successfully");
});
exports.addBook = addBook;
//FIXME - Add user object (protect)
const updateBook = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { bookId } = req.params;
    const { title, driveUrl, course, category } = req.body;
    if (!title || !driveUrl || !course || !category) {
        return next(new utils_1.ErrorResponse("All fields are required", 400));
    }
    const book = await models_1.Book.findById(bookId);
    if (!book) {
        return next(new utils_1.ErrorResponse("Book not found", 404));
    }
    if (req.user._id !== book.uploadedBy) {
        return next(new utils_1.ErrorResponse("You are not authorized to update this book", 401));
    }
    const updatedBook = await models_1.Book.findByIdAndUpdate(bookId, { title, driveUrl, course, category }, { new: true });
    (0, utils_1.SuccessResponse)(res, 200, updatedBook, "Book updated successfully");
});
exports.updateBook = updateBook;
const getBooksByUser = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    // const {userId}=req.params
    // const books=await Book.find({uploadedBy:req?.user._id})
    const books = await models_1.Book.aggregate([
        {
            $match: {
                uploadedBy: req?.user._id
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "course"
            }
        },
        {
            $project: {
                title: 1,
                driveUrl: 1,
                course: {
                    courseCode: 1
                },
                createdAt: 1,
                category: 1
            }
        }
    ]);
    (0, utils_1.SuccessResponse)(res, 200, books, "success");
});
exports.getBooksByUser = getBooksByUser;
