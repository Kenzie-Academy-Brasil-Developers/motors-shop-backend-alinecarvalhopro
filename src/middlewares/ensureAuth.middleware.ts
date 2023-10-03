import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const ensureAuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }

  const splitedToken = token.split(" ")[1];

  jwt.verify(
    splitedToken,
    process.env.SECRET_KEY!,
    (error: any, decoded: any) => {
      if (error) {
        return response.status(401).json({
          message: "Invalid token",
        });
      }

      response.locals.userId = decoded.sub;

      return next();
    }
  );
};

export { ensureAuthMiddleware };
