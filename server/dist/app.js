"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
if (process.env.NODE_ENV === 'production') {
    require('module-alias/register');
}
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("@/middlewares");
const utils_1 = require("@/common/utils");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("@/routes");
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const configs_1 = require("./common/configs");
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
// import xss from 'xss-clean';
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
// Middleware to parse JSON and cookies
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'http://192.168.44.119:5173', 'https://nuesa-library.loca.lt', 'https://faculty-library.netlify.app'],
    credentials: true, // Allow credentials (cookies) to be sent and received
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
};
// Add headers to the response
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
// Apply CORS middleware
app.use((0, cors_1.default)(corsOptions));
// Rate limiting middleware
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: configs_1.ENVIRONMENT.APP.ENV == 'development' ? 1000 : 100,
    message: 'Too many requests from this IP, please try again later',
});
app.use('/api/v1/courses', apiLimiter);
app.use('/api/v1/books', apiLimiter);
app.use('/api/v1/auth', apiLimiter);
// Security headers configuration
const helmetConfig = {
    xssFilter: true,
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'strict-origin' },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
};
app.use((0, helmet_1.default)(helmetConfig));
// Data sanitization against NoSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
// Logger middleware
app.use((0, morgan_1.default)(configs_1.ENVIRONMENT.APP.ENV !== 'development' ? 'combined' : 'dev'));
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Routes
app.use("/api/v1/users", routes_1.userRoutes);
app.use("/api/v1/auth", routes_1.authRoutes);
app.use("/api/v1/books", routes_1.booksRoute);
app.use("/api/v1/courses", routes_1.coursesRoute);
app.use("/api/v1/departments", routes_1.departmentsRoute);
app.all("*", (req, res, next) => {
    return next(new utils_1.ErrorResponse(`Can't find ${req.originalUrl} in the server`, 404));
});
app.use(middlewares_1.globalErrorHandler);
exports.default = app;
