"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const departmentsRoute = express_1.default.Router();
departmentsRoute.get("/", controllers_1.getAllDepartments).post("/", controllers_1.createDepartment);
departmentsRoute.get("/:id", controllers_1.getDepartment).patch("/:id", controllers_1.updateDepartment).delete("/:id", controllers_1.deleteDepartment);
exports.default = departmentsRoute;
