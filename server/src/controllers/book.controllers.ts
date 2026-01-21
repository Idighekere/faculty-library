import { ErrorResponse, SuccessResponse } from "@/common/utils";
import { catchAsync } from "@/middlewares";
import { Book, Course } from "@/models";
import { getAllBooksService } from "@/services/book.service";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const getBooksByCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { courseCode } = req.params;

    if (!courseCode) {
      return next(new ErrorResponse("Course parameter is required", 400));
    }

    // const books = await Book.find({ category:"textBook"}).populate('course');
    // const books = await Book.find({ "course": courseId }).populate({
    //     path:'course',
    //     select:"title courseCode"
    // }).lean().exec();

    const books = await Book.aggregate(
      [
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $match: { "course.courseCode": courseCode },
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
            "course.title": 1,
            "course.courseCode": 1,
          },
        },
      ],
      { includeVirtuals: true },
    ).exec();

    // if (!book) {
    //     return next(new ErrorResponse("Book not found", 404))
    // }

    SuccessResponse(res, 200, books, "success");
  },
);

const addBook = catchAsync(async (req: Request, res, next) => {
  const { title, driveUrl, courseCode, category } = req.body;

  if (!title || !driveUrl || !courseCode || !category) {
    return next(new ErrorResponse("All fields are required", 400));
  }

  const course = await Course.findOne({ courseCode });

  if (!course) {
    return next(
      new ErrorResponse(
        "Course not found. The course must be added by an admin before",
        404,
      ),
    );
  }

  const book = await Book.create({
    title,
    driveUrl,
    course: course._id,
    category,
    uploadedBy: req?.user._id,
  });

  // const bookResponse = {
  //     title:book.title,
  //     driveUrl:book.driveUrl,
  //     course:{
  //         title:book.course.title as any,
  //         courseCode:book.course.courseCode as any
  //     },
  //     category:book.category
  // }

  SuccessResponse(res, 201, book, "Book added successfully");
});

//FIXME - Add user object (protect)
const updateBook = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;

  const { title, driveUrl, course, category } = req.body;

  if (!title || !driveUrl || !course || !category) {
    return next(new ErrorResponse("All fields are required", 400));
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return next(new ErrorResponse("Book not found", 404));
  }

  if (req.user._id !== book.uploadedBy) {
    return next(
      new ErrorResponse("You are not authorized to update this book", 401),
    );
  }

  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    { title, driveUrl, course, category },
    { new: true },
  );

  SuccessResponse(res, 200, updatedBook, "Book updated successfully");
});

const getBooksByUser = catchAsync(async (req: Request, res, next) => {
  // const {userId}=req.params

  // const books=await Book.find({uploadedBy:req?.user._id})

  const books = await Book.aggregate([
    {
      $match: {
        uploadedBy: req?.user._id,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $project: {
        title: 1,
        driveUrl: 1,

        course: {
          courseCode: 1,
        },
        createdAt: 1,
        category: 1,
      },
    },
  ]);

  SuccessResponse(res, 200, books, "success");
});

const getAllBooks = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { page = 1, limit = 10, search, category } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string) || 10;

    const {books, pagination} = await getAllBooksService(
      pageNum,
      limitNum,
      search as string,
      category as string,
    );

    SuccessResponse(res, 200, { books, pagination });
  },
);
export { getBooksByCourse, addBook, getBooksByUser, updateBook, getAllBooks };
