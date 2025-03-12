"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_custom_error_1 = require("ts-custom-error");
class ErrorResponse extends ts_custom_error_1.CustomError {
    statusCode;
    status;
    isOperational;
    data;
    constructor(message, statusCode, data) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorResponse;
