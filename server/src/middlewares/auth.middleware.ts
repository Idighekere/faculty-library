import {  ErrorResponse, setCookie } from "@/common/utils";
import { catchAsync } from "./catchAsync";
import { Request, Response, NextFunction } from "express";
import { Role } from "@/common/constants";
import { authenticate } from "@/services";


const protectRoute = catchAsync(async (req:Request, res: Response, next: NextFunction) => {

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

    if(!refreshToken ){
        return next(new ErrorResponse("You are not logged in",401))
    }
    const {currentUser,accessToken:newAccessToken} = await authenticate({ accessToken, refreshToken });


    if (newAccessToken) {
        setCookie(res, 'accessToken', newAccessToken, {
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
    }

        req['user'] = currentUser;

    next()

})


const restrict = (...role:Role[]) => {

    return (req:Request, res:Response, next:NextFunction) => {

        if (!role.includes(req.user.role) ) {
            const err = new ErrorResponse('You do not have permission to perform this action', 401)
            return next(err)
        }
        next()
    }
}


export { protectRoute,restrict }
