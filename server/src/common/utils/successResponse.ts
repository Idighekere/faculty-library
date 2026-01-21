import { Response } from "express"

export const SuccessResponse = (res: Response, statusCode: number = 200, data: any, message?: string) => {


    res.status(statusCode).json({
        status: "success",
        data: data ?? null,
        message: message ?? "Success"
    })
}
