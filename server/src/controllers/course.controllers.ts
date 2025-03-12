import { ErrorResponse, SuccessResponse } from "@/common/utils";
import { catchAsync } from "@/middlewares";
import { Course, Department } from "@/models";
import { Request } from "express";


const createCourse = catchAsync(async (req: Request, res, next) => {

    const { title, courseCode, departmentShortNames, level, semester } = req.body

    if (!title || !courseCode || !departmentShortNames || !level || !semester) {
        return next(new ErrorResponse("All fields are required", 400))
    }

    const departments = await Department.find({ shortName: { $in: departmentShortNames.toUpperCase() } });

    if (departments.length !== departmentShortNames.length) {
        return next(new ErrorResponse("One or more department short names are invalid", 400))
    }

    const departmentIds = departments.map((dept:any) => dept._id);


    const course = await Course.create({ title, courseCode, departments: departmentIds, level, semester, addedBy: req.user._id })


    SuccessResponse(res, 201, course, "Course created successfully")
})


const getAllCourse = catchAsync(async (req, res, next) => {

})

const filterCourses = catchAsync(async (req, res, next) => {


    const { department, level, semester } = req.query

    if (!level || !semester) {
        return next(new ErrorResponse("Level and semester are required", 400))
    }

    const courses = await Course.aggregate([
        {
            $lookup: {
                from: "departments",
                localField: "departments",
                foreignField: "_id",
                as: "departments"
            }
        },

        // {$unwind:'$departments'},
        {
            $match: {
                'departments.shortName': department,
                level: parseInt(level as string),
                semester: semester
            }
        },
        {
            $project: {
                title: 1,
                courseCode: 1,
                departments: {
                    name: 1,
                    shortName: 1
                },
                level: 1,
                semester: 1
            }
        }

    ])

    SuccessResponse(res, 200, courses, "success")
})

const getCoursesByUser = catchAsync(async (req: Request, res, next) => {

    // const courses=await Course.find({addedBy:req?.user._id})

    const courses = await Course.aggregate([

        // {$unwind:'$departments'},
        {
            $match: {
                addedBy: req?.user._id
            }
        },
        {
            $lookup: {
                from: "departments",
                localField: "departments",
                foreignField: "_id",
                as: "departments"
            }
        },
        {
            $project: {
                title: 1,
                courseCode: 1,
                departments: {
                    name: 1,
                    shortName: 1
                },
                level: 1,
                semester: 1
            }
        }

    ])


    SuccessResponse(res, 200, courses, "success")
})

const updateCourse = catchAsync(async (req, res, next) => {

})


//FIXME - Implementing soft delete
const deleteCourse = catchAsync(async (req, res, next) => {

})


export { getCoursesByUser, getAllCourse, updateCourse, deleteCourse, createCourse, filterCourses }
