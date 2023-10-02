import { Request, Response } from "express";
import { SessionService } from "../services/session.service";

export class SessionController {
  constructor(private sessionService: SessionService) {}
  async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const token = await this.sessionService.create({ email, password });

    response.json({ token });
  }
}
