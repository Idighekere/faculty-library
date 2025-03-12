"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterCourses = exports.createCourse = exports.deleteCourse = exports.updateCourse = exports.getAllCourse = exports.getCoursesByUser = void 0;
const utils_1 = require("@/common/utils");
const middlewares_1 = require("@/middlewares");
const models_1 = require("@/models");
const createCourse = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { title, courseCode, departmentShortNames, level, semester } = req.body;
    if (!title || !courseCode || !departmentShortNames || !level || !semester) {
        return next(new utils_1.ErrorResponse("All fields are required", 400));
    }
    const departments = await models_1.Department.find({ shortName: { $in: departmentShortNames.toUpperCase() } });
    if (departments.length !== departmentShortNames.length) {
        return next(new utils_1.ErrorResponse("One or more department short names are invalid", 400));
    }
    const departmentIds = departments.map(dept => dept._id);
    const course = await models_1.Course.create({ title, courseCode, departments: departmentIds, level, semester, addedBy: req.user._id });
    (0, utils_1.SuccessResponse)(res, 201, course, "Course created successfully");
});
exports.createCourse = createCourse;
const getAllCourse = (0, middlewares_1.catchAsync)(async (req, res, next) => {
});
exports.getAllCourse = getAllCourse;
const filterCourses = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { department, level, semester } = req.query;
    if (!level || !semester) {
        return next(new utils_1.ErrorResponse("Level and semester are required", 400));
    }
    const courses = await models_1.Course.aggregate([
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
                level: parseInt(level),
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
    ]);
    (0, utils_1.SuccessResponse)(res, 200, courses, "success");
});
exports.filterCourses = filterCourses;
const getCoursesByUser = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    // const courses=await Course.find({addedBy:req?.user._id})
    const courses = await models_1.Course.aggregate([
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
    ]);
    (0, utils_1.SuccessResponse)(res, 200, courses, "success");
});
exports.getCoursesByUser = getCoursesByUser;
const updateCourse = (0, middlewares_1.catchAsync)(async (req, res, next) => {
});
exports.updateCourse = updateCourse;
//FIXME - Implementing soft delete
const deleteCourse = (0, middlewares_1.catchAsync)(async (req, res, next) => {
});
exports.deleteCourse = deleteCourse;
