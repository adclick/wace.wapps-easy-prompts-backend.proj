import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Handled errors
    if(err instanceof CustomError) {
      const { statusCode, errors, logging, stack } = err;

      if(logging) {
        console.error(JSON.stringify({
          code: statusCode,
          errors: errors,
          stack: stack,
        }, null, 2));
      }
  
      return res.status(statusCode).json({status: false, message: err.message});
    }
  
    // Unhandled errors
    console.error(err);
    return res.status(500).send({ status: false, message: "Something went wrong"});
  };