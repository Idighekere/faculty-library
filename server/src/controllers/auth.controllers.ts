import { ENVIRONMENT } from "@/common/configs";
import { clearCookie, comparePassword, ErrorResponse, generateTokens, hashData, hashPassword, setCookie, SuccessResponse } from "@/common/utils";
import { catchAsync } from "@/middlewares";
import { User } from "@/models";
import { NextFunction, Request, Response } from "express";


const login =catchAsync(async (req:Request,res:Response,next:NextFunction):Promise<void>=>{

    const {password,email}=req.body

    if(!email||!password){
        return next(new ErrorResponse("Incomplete login data",400))
    }

    const user=await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorResponse("Invalid credentials",401))
    }

    const isPasswordMatching= await comparePassword(password,user!.password as string)

    if(!isPasswordMatching){
        return next(new ErrorResponse("Invalid credentials",401))
    }


    const accessToken= generateTokens.access(
        {id:user._id.toString()},{expiresIn:Number(ENVIRONMENT?.JWT?.EXPIRES_IN?.ACCESS)})

    setCookie(res,"accessToken",accessToken,{maxAge:15*60*1000}) //15 minutes



    const refreshToken =  generateTokens.refresh(
        { id: user._id.toString() },
        { expiresIn: Number(ENVIRONMENT.JWT.EXPIRES_IN.REFRESH!) },
        ENVIRONMENT.JWT.REFRESH_KEY!,
    );

    setCookie(res, 'refreshToken', refreshToken, {
        maxAge: 30*24 * 60 * 60 * 1000, // 30 days
    })

    user.refreshToken = refreshToken;
    await user.save();


    user.refreshToken=undefined
    user.password=undefined

    const responseData={
        user,
        accessToken
    }

    //FIXME - handle response properly
    SuccessResponse(res,200,responseData,"Login successful")

})


const register = catchAsync(async (req, res, next) => {

    const {email,name,password}=req.body

    if(!email||!password||!name){
        return next(new ErrorResponse("Incomplete signup data",400))
    }

    const userExists=await User.findOne({email})

    if(userExists){
        return next(new ErrorResponse("Email already exist",409))
    }

    const hashedPassword= await hashPassword(password)

    const newUser=await User.create({email,name,password:hashedPassword})

    SuccessResponse(res,201,{email,name,role:newUser.role},"User created successfully")

})



const logout = catchAsync(async (req:Request, res, next) => {

    const {user} = req
    if(!user){
        return next(new ErrorResponse("You are not logged in",404))
    }

    await User.findByIdAndUpdate(user._id,{$unset:{refreshToken:1}}) // unset will remove the refreshToken field

    clearCookie(res,"refreshToken")
    clearCookie(res,"accessToken")

    SuccessResponse(res, 200, null, 'Logout successful');

})



//TODO - Implement forgot and reset passord functionality
const forgotPassword = catchAsync(async (req, res, next) => {


})

const resetPassword = catchAsync(async (req, res, next) => {


})

export {login,logout,register,forgotPassword,resetPassword,}
