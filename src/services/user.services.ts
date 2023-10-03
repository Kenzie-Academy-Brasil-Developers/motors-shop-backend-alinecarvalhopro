import { hash } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entitie";
import { AppError } from "../errors/appError";
import {
  TUserRequest,
  TUserResponse,
  TUserUdpateRequest,
  TUserUpateResponse,
} from "../interfaces/user.interfaces";
import {
  userResponseSchema,
} from "../schemas/user.schemas";
import { addressRequestSchema } from "../schemas/address.schemas";
import { Address } from "../entities/address.entitie";
import { DeepPartial } from "typeorm";

export class UserServices {
  async create(data: TUserRequest): Promise<TUserResponse> {
    const {
      name,
      email,
      password,
      cpf,
      phone_number,
      description,
      seller,
      birth,
    } = data;

    const addressRepository = AppDataSource.getRepository(Address);

    const queryBuilder = addressRepository.createQueryBuilder("address");
    queryBuilder
      .where("address.number = :number", { number: data.address.number || "" })
      .andWhere("address.cep = :cep", { cep: data.address.cep })
      .andWhere("address.state = :state", { state: data.address.state })
      .andWhere("address.city = :city", { city: data.address.city })
      .andWhere("address.street = :street", { street: data.address.street })
      .andWhere("address.complement = :complement", {
        complement: data.address.complement,
      });

    const foundAddress = await queryBuilder.getOne();

    const addressData = addressRequestSchema.parse(data.address);
    const addressToAdd = addressRepository.create(addressData);
    await addressRepository.save(addressToAdd);

    const userRepository = AppDataSource.getRepository(User);

    const hashedPassword = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      cpf,
      password: hashedPassword,
      phone_number,
      birth,
      description,
      seller,
      address: addressToAdd,
    } as DeepPartial<User>);

    await userRepository.save(user);

    return userResponseSchema.parse(user);
  }

  async update(
    id: string,
    data: TUserUdpateRequest
  ): Promise<TUserUpateResponse> {
    const userRepository = AppDataSource.getRepository(User);
    const addressRepository = AppDataSource.getRepository(Address);

    const foundUser = await userRepository.findOne({
      where: {
        id: id,
      },
      relations: { address: true },
    });

    if (!foundUser) {
      throw new AppError("User not found", 404);
    }

    const userData = { ...data };
    const addressData = { ...data.address };

    if (addressData) {
      const userAddress = foundUser.address;

      if (userAddress) {
        await addressRepository.update(userAddress.id, addressData);
      } else {
        const newAddress = addressRepository.create(addressData);
        foundUser.address = newAddress;
      }
    }

    userRepository.merge(foundUser, userData);
    await userRepository.save(foundUser);

    const reloadedUser = await userRepository.findOne({
      where: { id: id },
      relations: { address: true },
    });

    const updatedUserResponse = userResponseSchema.parse(reloadedUser);

    return updatedUserResponse;
  }

  async delete(userId: string): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!findUser) throw new Error("User not found");

    await userRepository.remove(findUser);

    return;
  }
}
