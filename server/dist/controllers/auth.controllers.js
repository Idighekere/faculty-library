"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.register = exports.logout = exports.login = void 0;
const configs_1 = require("@/common/configs");
const utils_1 = require("@/common/utils");
const middlewares_1 = require("@/middlewares");
const models_1 = require("@/models");
const login = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { password, email } = req.body;
    if (!email || !password) {
        return next(new utils_1.ErrorResponse("Incomplete login data", 400));
    }
    const user = await models_1.User.findOne({ email }).select("+password");
    if (!user) {
        return next(new utils_1.ErrorResponse("Invalid credentials", 401));
    }
    const isPasswordMatching = await (0, utils_1.comparePassword)(password, user.password);
    if (!isPasswordMatching) {
        return next(new utils_1.ErrorResponse("Invalid credentials", 401));
    }
    const accessToken = utils_1.generateTokens.access({ id: user._id.toString() }, { expiresIn: Number(configs_1.ENVIRONMENT?.JWT?.EXPIRES_IN?.ACCESS) });
    (0, utils_1.setCookie)(res, "accessToken", accessToken, { maxAge: 15 * 60 * 1000 }); //15 minutes
    const refreshToken = utils_1.generateTokens.refresh({ id: user._id.toString() }, { expiresIn: Number(configs_1.ENVIRONMENT.JWT.EXPIRES_IN.REFRESH) }, configs_1.ENVIRONMENT.JWT.REFRESH_KEY);
    (0, utils_1.setCookie)(res, 'refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    user.refreshToken = refreshToken;
    await user.save();
    user.refreshToken = undefined;
    user.password = undefined;
    const responseData = {
        user,
        accessToken
    };
    //FIXME - handle response properly
    (0, utils_1.SuccessResponse)(res, 200, responseData, "Login successful");
});
exports.login = login;
const register = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { email, name, password } = req.body;
    if (!email || !password || !name) {
        return next(new utils_1.ErrorResponse("Incomplete signup data", 400));
    }
    const userExists = await models_1.User.findOne({ email });
    if (userExists) {
        return next(new utils_1.ErrorResponse("Email already exist", 409));
    }
    const hashedPassword = await (0, utils_1.hashPassword)(password);
    const newUser = await models_1.User.create({ email, name, password: hashedPassword });
    (0, utils_1.SuccessResponse)(res, 201, { email, name, role: newUser.role }, "User created successfully");
});
exports.register = register;
const logout = (0, middlewares_1.catchAsync)(async (req, res, next) => {
    const { user } = req;
    if (!user) {
        return next(new utils_1.ErrorResponse("You are not logged in", 404));
    }
    await models_1.User.findByIdAndUpdate(user._id, { $unset: { refreshToken: 1 } }); // unset will remove the refreshToken field
    (0, utils_1.clearCookie)(res, "refreshToken");
    (0, utils_1.clearCookie)(res, "accessToken");
    (0, utils_1.SuccessResponse)(res, 200, null, 'Logout successful');
});
exports.logout = logout;
//TODO - Implement forgot and reset passord functionality
const forgotPassword = (0, middlewares_1.catchAsync)(async (req, res, next) => {
});
exports.forgotPassword = forgotPassword;
const resetPassword = (0, middlewares_1.catchAsync)(async (req, res, next) => {
});
exports.resetPassword = resetPassword;
