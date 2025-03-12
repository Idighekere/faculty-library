import { TokenPayload } from './../types/auth.types';
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken"
import { ENVIRONMENT } from "../configs";
import { CookieOptions, Response } from "express";


const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 12);
}


const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}


const hashData = (data: {
    id?: string;
    token?: string;
}, options: SignOptions, secret?: any) => {


    const signOptions = options?.expiresIn ? { expiresIn: options?.expiresIn } : {}

    return jwt.sign({ ...data },
        secret ? secret : ENVIRONMENT.JWT.ACCESS_KEY, signOptions)
}

const verifyToken = async <T=TokenPayload>(token: string, secret: string): Promise<TokenPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded as TokenPayload);
        });
    });
}

const setCookie = (res: Response, name: string, value: string, options: CookieOptions = {}) => {

    res.cookie(name, value, {
        httpOnly: true,
        secure: ENVIRONMENT.APP.ENV == 'production',
        path: "/",
        sameSite: ENVIRONMENT.APP.ENV == 'production' ? 'none' : 'lax',
        // partitioned:ENVIRONMENT.APP.ENV=='production',
        ...options

    })

}


const clearCookie = (res: Response, name: string, options: CookieOptions = {}) => {
    setCookie(res, name, "", { maxAge: -1, ...options })
}

const generateTokens = {

    access: (payload: TokenPayload, options?: SignOptions, _secret: any = ENVIRONMENT.JWT.ACCESS_KEY) => {

        const signOptions = options?.expiresIn ? { expiresIn: options?.expiresIn } : {}

        return jwt.sign(payload, _secret, signOptions)
    },

    refresh: (payload: TokenPayload, options?: SignOptions, _secret: any = ENVIRONMENT.JWT.REFRESH_KEY,) => {

        const signOptions = options?.expiresIn ? { expiresIn: options?.expiresIn } : {}

        return jwt.sign(payload, _secret, signOptions)
    }
}

const extractDriveFileId = (url: string) => {
    const regex = /(?:(?:drive|docs)\.google\.com\/(?:a\/[^\/]+\/)?(?:file\/d\/|open\?id=|uc\?id=|thumbnail\?id=|document\/d\/|spreadsheets\/d\/|presentation\/d\/))([a-zA-Z0-9_-]{10,})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};


const getDepartmentShortName = (name: string) => {


    if (name.includes('Computer')) {
        return 'CPE'
    } else if (name.includes('Agricultural') || name.includes('Agric')) {
        return 'AGE'
    } else if (name.includes('Electrical')) {
        return 'ELE'
    }
    else if (name.includes('Mechanical')) {
        return 'MEE'
    } else if (name.includes('Petroleum')) {
        return 'PEE'
    } else if (name.includes('Food')) {
        return 'FDE'
    } else if (name.includes('Civil')) {
        return 'CVE'
    } else if (name.includes('Chemical')) {
        return 'CHE'

    } else {
        return ''
    }

}


export { hashPassword, comparePassword, verifyToken, hashData, setCookie, extractDriveFileId, getDepartmentShortName, generateTokens, clearCookie }
