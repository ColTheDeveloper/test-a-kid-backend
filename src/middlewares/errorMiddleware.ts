import { CustomError } from "../utils/customError"
import { Response, Request, NextFunction } from 'express';

export const createError=(status:number,message:string)=>{
    return new CustomError(message,status)
}

export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    const err = new CustomError(`Route ${req.originalUrl} not found`, 404);
    next(err);
};

export const globalErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    data:null
    });
};