"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("@/middlewares");
const controllers_1 = require("@/controllers");
const express_1 = __importDefault(require("express"));
const booksRoute = express_1.default.Router();
booksRoute.route("/").post(middlewares_1.protectRoute, controllers_1.addBook).get(middlewares_1.protectRoute, controllers_1.getBooksByUser);
booksRoute.route("/:id").get().patch(middlewares_1.protectRoute, controllers_1.updateBook).delete();
booksRoute.route("/course/:courseCode").get(controllers_1.getBooksByCourse);
booksRoute.route("/all").get(controllers_1.getAllBooks);
exports.default = booksRoute;
