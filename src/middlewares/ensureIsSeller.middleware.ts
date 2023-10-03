import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { User } from "../entities/user.entitie";
import { AppDataSource } from "../data-source";

const ensureIsSeller = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId = response.locals.userId;
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found");
  }

  if (user.seller) {
    return next();
  } else {
    throw new AppError("Insufficient permission");
  }
};

export { ensureIsSeller };
