import { protectRoute } from '@/middlewares';
import { addBook, getBooksByCourse, getBooksByUser, updateBook } from '@/controllers'
import express from 'express'


const booksRoute= express.Router()

booksRoute.route("/").post(protectRoute, addBook).get(protectRoute, getBooksByUser)
booksRoute.route("/:id").get().patch(protectRoute,updateBook).delete()

booksRoute.route("/course/:courseCode").get(getBooksByCourse)

export default booksRoute
