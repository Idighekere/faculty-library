import { createDepartment, deleteDepartment, getAllDepartments, getDepartment, updateDepartment } from "@/controllers"
import { protectRoute } from "@/middlewares"
import express from "express"

const departmentsRoute=express.Router()

departmentsRoute.get("/",getAllDepartments).post("/",createDepartment)
departmentsRoute.get("/:id",getDepartment).patch("/:id",updateDepartment).delete("/:id",deleteDepartment)

export default departmentsRoute
