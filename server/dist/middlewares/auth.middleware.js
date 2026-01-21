"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrict = exports.protectRoute = void 0;
const utils_1 = require("../common/utils");
const catchAsync_1 = require("./catchAsync");
const services_1 = require("../services");
const protectRoute = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    let accessToken;
    let refreshToken;
    // let token;
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     token = req.headers.authorization.split(' ')[1];
    //     console.log(token);
    // }
    if (req.cookies) {
        accessToken = req.cookies.accessToken;
        refreshToken = req.cookies.refreshToken;
    }
    if (!refreshToken) {
        return next(new utils_1.ErrorResponse("You are not logged in", 401));
    }
    const { currentUser, accessToken: newAccessToken } = await (0, services_1.authenticate)({ accessToken, refreshToken });
    if (newAccessToken) {
        (0, utils_1.setCookie)(res, 'accessToken', newAccessToken, {
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
    }
    req['user'] = currentUser;
    next();
});
exports.protectRoute = protectRoute;
const restrict = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            const err = new utils_1.ErrorResponse('You do not have permission to perform this action', 401);
            return next(err);
        }
        next();
    };
};
exports.restrict = restrict;
