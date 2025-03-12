"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENVIRONMENT = void 0;
require("dotenv/config");
exports.ENVIRONMENT = {
    APP: {
        PORT: parseInt(process.env.PORT || process.env.APP_PORT || '5000'),
        ENV: process.env.NODE_ENV,
        CLIENT: process.env.FRONTEND_URL
    },
    DB: {
        URI: process.env.MONGO_URI
    },
    JWT: {
        ACCESS_KEY: process.env.ACCESS_SECRET,
        REFRESH_KEY: process.env.REFRESH_SECRET,
        EXPIRES_IN: {
            ACCESS: process?.env?.ACCESS_EXPIRES_IN,
            REFRESH: process.env.REFRESH_EXPIRES_IN
        }
    }
};
