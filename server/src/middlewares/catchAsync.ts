import { NextFunction, Request, Response } from "express"

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>

export const catchAsync = (fn: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next)
    }
}
