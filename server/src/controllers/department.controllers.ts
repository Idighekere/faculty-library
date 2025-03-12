import { ErrorResponse, SuccessResponse } from "@/common/utils";
import { catchAsync } from "@/middlewares";
import { Department } from "@/models";
import { Request, Response } from "express";




const getAllDepartments = catchAsync(async (req, res, next) => {


    const departments = await Department.find()

    SuccessResponse(res, 200, departments, "success")

})


const createDepartment = catchAsync(async (req: Request, res: Response, next) => {
    console.log(req['user'] as any)
    const { name, logo, association } = req.body

    if (!name) {
        return next(new ErrorResponse("Name and logo url is required", 400))
    }

    const newDepartment = await Department.create({ name, logo, association })

    SuccessResponse(res, 201, newDepartment, "department created successfully")
})

const getDepartment = catchAsync(async (req, res, next) => {

    const { id } = req.params


    const department = await Department.findById(id)


    if (!department) {
        return next(new ErrorResponse("The department doesn;t exist", 404))
    }

    SuccessResponse(res, 200, department, "success")
})


const updateDepartment = catchAsync(async (req, res, next) => {
    const { id } = req.params


    const department = await Department.findByIdAndUpdate({ _id: id }, req.body)


    if (!department) {
        return next(new ErrorResponse("The department doesn;t exist", 404))
    }

    SuccessResponse(res, 200, department, "department updated succcessfully")


})

//FIXME - Implement soft delete
const deleteDepartment = catchAsync(async (req, res, next) => {
    const { id } = req.params


    const department = await Department.findById(id)

    if (!department) {
        return next(new ErrorResponse("The department doesn;t exist", 404))
    }

    SuccessResponse(res, 204, department, "success")
})


export { getAllDepartments, createDepartment, updateDepartment, getDepartment, deleteDepartment }
