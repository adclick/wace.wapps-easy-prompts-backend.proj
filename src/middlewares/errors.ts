import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // if ("response" in err && "status" in err.response && "statusText" in err.response) {
    //     let message = err.response.statusText;

    //     switch (err.response.status) {
    //         case 429:
    //             message = "Sorry, this is an experimental version and our servers are full. Please try again later";
    //             break;
    //     }

    //     return {
    //         code: 400,
    //         status: err.response.status,
    //         message
    //     }
    // }
    
    // return {
    //     code: 500,
    //     status: false,
    //     message: err.message
    // }
};