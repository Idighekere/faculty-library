import { protectRoute, restrict } from '@/middlewares';
import { createCourse, filterCourses, getAllCourse, getCoursesByUser } from "@/controllers"
import express from "express"
import { Role } from '@/common/constants';

const coursesRoute = express.Router()


coursesRoute.route("/").post(protectRoute,restrict(Role.Admin),createCourse).get(filterCourses)
coursesRoute.get('/me',protectRoute,getCoursesByUser)

export default coursesRoute
