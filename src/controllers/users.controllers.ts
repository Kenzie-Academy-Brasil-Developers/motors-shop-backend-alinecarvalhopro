import { Request, Response } from "express";
import { UserServices } from "../services/user.services";
import { TUserUdpateRequest } from "../interfaces/user.interfaces";

export class UsersController {
  constructor(private userService: UserServices) {}
  async create(request: Request, response: Response) {
    const newUser = await this.userService.create(request.body);
    return response.status(201).json(newUser);
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;
    const foundUser = await this.userService.getById(id);
    response.status(200).json(foundUser);
  }  

  async update(request: Request, response: Response) {
    const userId = response.locals.userId;
    const { id } = request.params;
    const updatedUser = await this.userService.update(
      id,
      request.body as TUserUdpateRequest
    );
    response.status(200).json(updatedUser);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    await this.userService.delete(id);
    return response.status(204).json();
  }
}
