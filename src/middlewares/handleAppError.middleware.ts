import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { ZodError } from "zod";

const handleAppErrorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  console.log(typeof error, "*************************")
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: error.flatten().fieldErrors,
    });
  }

  console.error(error);

  return response.status(500).json({
    message: error.message,
  });
};

export { handleAppErrorMiddleware };
