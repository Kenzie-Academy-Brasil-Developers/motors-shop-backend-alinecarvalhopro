import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entitie";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/appError";

const ensureUserIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId = request.params.id;
  // const userRepository = AppDataSource.getRepository(User);

  // const foundEntity: User | null = await userRepository.findOneBy({ id });
  // if (!foundEntity) throw new AppError("User not found", 404);

  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOne({
    where: {
      id: userId
    },
  });
  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  response.locals = { ...response.locals, findUser };

  return next();
};

export default ensureUserIdExists;