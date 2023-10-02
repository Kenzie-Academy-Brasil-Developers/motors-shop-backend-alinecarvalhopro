import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";
import { AppError } from "../errors/appError";

const ensureUniqueEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = request.body;

  const userRepository = AppDataSource.getRepository(User);

  if (email) {
    const findEmail = await userRepository.findOneBy({ email: email });
    if (findEmail) throw new AppError("Email already exists", 409);
  }

  return next();
};

export default ensureUniqueEmail;