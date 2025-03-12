"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.getDepartment = exports.updateDepartment = exports.createDepartment = exports.getAllDepartments = void 0;
const utils_1 = require("@/common/utils");
const middlewares_1 = require("@/middlewares");
const models_1 = require("@/models");
const getAllDepartments = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const departments = await models_1.Department.find();
    (0, utils_1.SuccessResponse)(res, 200, departments, "success");
});
exports.getAllDepartments = getAllDepartments;
const createDepartment = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    console.log(req['user']);
    const { name, logo, association } = req.body;
    if (!name) {
        return next(new utils_1.ErrorResponse("Name and logo url is required", 400));
    }
    const newDepartment = await models_1.Department.create({ name, logo, association });
    (0, utils_1.SuccessResponse)(res, 201, newDepartment, "department created successfully");
});
exports.createDepartment = createDepartment;
const getDepartment = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const department = await models_1.Department.findById(id);
    if (!department) {
        return next(new utils_1.ErrorResponse("The department doesn;t exist", 404));
    }
    (0, utils_1.SuccessResponse)(res, 200, department, "success");
});
exports.getDepartment = getDepartment;
const updateDepartment = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const department = await models_1.Department.findByIdAndUpdate({ _id: id }, req.body);
    if (!department) {
        return next(new utils_1.ErrorResponse("The department doesn;t exist", 404));
    }
    (0, utils_1.SuccessResponse)(res, 200, department, "department updated succcessfully");
});
exports.updateDepartment = updateDepartment;
//FIXME - Implement soft delete
const deleteDepartment = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const department = await models_1.Department.findById(id);
    if (!department) {
        return next(new utils_1.ErrorResponse("The department doesn;t exist", 404));
    }
    (0, utils_1.SuccessResponse)(res, 204, department, "success");
});
exports.deleteDepartment = deleteDepartment;
