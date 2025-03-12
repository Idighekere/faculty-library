"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = exports.userRoutes = exports.departmentsRoute = exports.coursesRoute = exports.booksRoute = void 0;
var books_route_1 = require("./books.route");
Object.defineProperty(exports, "booksRoute", { enumerable: true, get: function () { return __importDefault(books_route_1).default; } });
var courses_route_1 = require("./courses.route");
Object.defineProperty(exports, "coursesRoute", { enumerable: true, get: function () { return __importDefault(courses_route_1).default; } });
var departments_route_1 = require("./departments.route");
Object.defineProperty(exports, "departmentsRoute", { enumerable: true, get: function () { return __importDefault(departments_route_1).default; } });
var users_route_1 = require("./users.route");
Object.defineProperty(exports, "userRoutes", { enumerable: true, get: function () { return __importDefault(users_route_1).default; } });
var auth_route_1 = require("./auth.route");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(auth_route_1).default; } });
