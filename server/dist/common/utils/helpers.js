"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookie = exports.generateTokens = exports.getDepartmentShortName = exports.extractDriveFileId = exports.setCookie = exports.hashData = exports.verifyToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const hashPassword = async (password) => {
    return await bcryptjs_1.default.hash(password, 12);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    return await bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const hashData = (data, options, secret) => {
    const signOptions = options?.expiresIn ? { expiresIn: options?.expiresIn } : {};
    return jsonwebtoken_1.default.sign({ ...data }, secret ? secret : configs_1.ENVIRONMENT.JWT.ACCESS_KEY, signOptions);
};
exports.hashData = hashData;
const verifyToken = async (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
const setCookie = (res, name, value, options = {}) => {
    res.cookie(name, value, {
        httpOnly: true,
        secure: configs_1.ENVIRONMENT.APP.ENV == 'production',
        path: "/",
        sameSite: configs_1.ENVIRONMENT.APP.ENV == 'production' ? 'none' : 'lax',
        // partitioned:ENVIRONMENT.APP.ENV=='production',
        ...options
    });
};
exports.setCookie = setCookie;
const clearCookie = (res, name, options = {}) => {
    setCookie(res, name, "", { maxAge: -1, ...options });
};
exports.clearCookie = clearCookie;
const generateTokens = {
    access: (payload, options, _secret = configs_1.ENVIRONMENT.JWT.ACCESS_KEY) => {
        const signOptions = options?.expiresIn ? { expiresIn: options?.expiresIn } : {};
        return jsonwebtoken_1.default.sign(payload, _secret, signOptions);
    },
    refresh: (payload, options, _secret = configs_1.ENVIRONMENT.JWT.REFRESH_KEY) => {
        const signOptions = options?.expiresIn ? { expiresIn: options?.expiresIn } : {};
        return jsonwebtoken_1.default.sign(payload, _secret, signOptions);
    }
};
exports.generateTokens = generateTokens;
const extractDriveFileId = (url) => {
    const regex = /(?:(?:drive|docs)\.google\.com\/(?:a\/[^\/]+\/)?(?:file\/d\/|open\?id=|uc\?id=|thumbnail\?id=|document\/d\/|spreadsheets\/d\/|presentation\/d\/))([a-zA-Z0-9_-]{10,})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
exports.extractDriveFileId = extractDriveFileId;
const getDepartmentShortName = (name) => {
    if (name.includes('Computer')) {
        return 'CPE';
    }
    else if (name.includes('Agricultural') || name.includes('Agric')) {
        return 'AGE';
    }
    else if (name.includes('Electrical')) {
        return 'EEE';
    }
    else if (name.includes('Mechanical')) {
        return 'MEE';
    }
    else if (name.includes('Petroleum')) {
        return 'PET';
    }
    else if (name.includes('Food')) {
        return 'FDE';
    }
    else if (name.includes('Civil')) {
        return 'CVE';
    }
    else if (name.includes('Chemical')) {
        return 'CHE';
    }
    else {
        return '';
    }
};
exports.getDepartmentShortName = getDepartmentShortName;
