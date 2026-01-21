"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const userRoutes = express_1.default.Router();
userRoutes.get('/me', middlewares_1.protectRoute, controllers_1.getCurrentUser);
exports.default = userRoutes;
