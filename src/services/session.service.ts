import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";
import { AppError } from "../errors/appError";
import { TLoginRequest } from "../interfaces/session.interface";
import jwt from "jsonwebtoken";
import "dotenv/config";

class SessionService {
  async create({ email, password }: TLoginRequest) {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw new AppError("Invalid credentials", 403);
    }

    const passwordMatch = await compare(password, findUser.password);

    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 403);
    }

    const token = jwt.sign(
      { name: findUser.name, id: findUser.id },
      process.env.SECRET_KEY!,
      { expiresIn: "1h", subject: findUser.id }
    );

    return token;
  }
}

export { SessionService };
