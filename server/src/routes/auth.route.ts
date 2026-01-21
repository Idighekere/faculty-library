import { protectRoute } from '@/middlewares';
import { login, logout, register } from "@/controllers";
import express from "express";

const authRoutes= express.Router();

authRoutes.post('/login', login).post("/register",register).post("/logout",protectRoute,logout)
// .post('/refresh-token',refreshToken);

export default authRoutes;
