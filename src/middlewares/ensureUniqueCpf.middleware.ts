import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";
import { AppError } from "../errors/appError";

const ensureUniqueCpf = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { cpf } = request.body;

  const userRepository = AppDataSource.getRepository(User);

  if (cpf) {
    const findCpf = await userRepository.findOneBy({ cpf: cpf });
    if (findCpf) throw new AppError("CPF already exists", 409);
  }

  return next();
};

export default ensureUniqueCpf;
