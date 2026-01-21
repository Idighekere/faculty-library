
import { getCurrentUser } from "@/controllers";
import { protectRoute } from "@/middlewares";
import express, { Express, Request, Response } from "express";

const userRoutes = express.Router();

userRoutes.get('/me', protectRoute,getCurrentUser)
export default userRoutes;
