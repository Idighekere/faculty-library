"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
const SuccessResponse = (res, statusCode = 200, data, message) => {
    res.status(statusCode).json({
        status: "success",
        data: data ?? null,
        message: message ?? "Success"
    });
};
exports.SuccessResponse = SuccessResponse;
