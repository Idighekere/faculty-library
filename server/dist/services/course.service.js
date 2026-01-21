"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterCoursesService = void 0;
const models_1 = require("@/models");
const filterCoursesService = async (department, semester, level) => {
    const matchConditions = {};
    // if department is provided, filter by department
    if (department) {
        matchConditions["departments.shortName"] = department;
    }
    //if level is provided, filter by level
    if (level) {
        matchConditions["level"] = parseInt(level);
    }
    //if semester is provided, filter by semester
    if (semester) {
        matchConditions["semester"] = semester;
    }
    //Require atleasr one filter
    if (Object.keys(matchConditions).length === 0) {
        throw new Error("At least one filter (department, level, semester) must be provided");
    }
    const courses = await models_1.Course.aggregate([
        {
            $lookup: {
                from: "departments",
                localField: "departments",
                foreignField: "_id",
                as: "departments",
            },
        },
        // {$unwind:'$departments'},
        {
            $match: matchConditions,
        },
        //Sort by level (ascending) and semester (ascending)
        {
            $sort: { level: 1, semester: 1 },
        },
        {
            $project: {
                title: 1,
                courseCode: 1,
                departments: {
                    name: 1,
                    shortName: 1,
                },
                level: 1,
                semester: 1,
            },
        },
    ]);
    return courses;
};
exports.filterCoursesService = filterCoursesService;
