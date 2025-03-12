
import * as dotenv from 'dotenv';
dotenv.config();
if (process.env.NODE_ENV === 'production') {
	require('module-alias/register');
}


import express, { NextFunction, Request, Response } from 'express';
import { globalErrorHandler } from '@/middlewares';
import {ErrorResponse} from '@/common/utils';
import cookie from 'cookie-parser'
import { authRoutes, booksRoute, coursesRoute, departmentsRoute, userRoutes } from '@/routes';
import cors from "cors"
import rateLimit from "express-rate-limit"
import helmet, { HelmetOptions } from 'helmet';
import { ENVIRONMENT } from './common/configs';
import mongoSanitize from 'express-mongo-sanitize';
// import xss from 'xss-clean';
import morgan from 'morgan';



const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookie());

// CORS configuration
const corsOptions = {
	origin: ['http://localhost:5173', 'http://192.168.44.119:5173', 'https://nuesa-library.loca.lt', 'https://faculty-library.netlify.app'],
	credentials: true, // Allow credentials (cookies) to be sent and received
	optionsSuccessStatus: 200,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
};
// Add headers to the response
app.use((req:Request, res:Response, next:NextFunction) => {
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

// Apply CORS middleware
app.use(cors(corsOptions));

// Rate limiting middleware
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: ENVIRONMENT.APP.ENV=='development'?100:25,
	message: 'Too many requests from this IP, please try again later',
});
app.use('/api/v1/', apiLimiter);

// Security headers configuration
const helmetConfig:HelmetOptions = {
	xssFilter: true,
	frameguard: { action: 'deny' },
	referrerPolicy: { policy: 'strict-origin' },
	hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
};
app.use(helmet(helmetConfig));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Logger middleware
app.use(morgan(ENVIRONMENT.APP.ENV !== 'development' ? 'combined' : 'dev'));

app.get('/', (req:Request, res:Response) => {
    res.send('Hello, world!');
});

// Routes
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/books",booksRoute)
app.use("/api/v1/courses",coursesRoute)
app.use("/api/v1/departments",departmentsRoute)

app.all("*",(req:Request,res:Response,next:NextFunction)=>{
    return next(new ErrorResponse(`Can't find ${req.originalUrl} in the server`,404))
})

app.use(globalErrorHandler)


export default app
