import { z } from "zod";
import {
  userRequestSchema,
  userResponseSchema,
  userSchema,
  userUdpateSchema,
} from "../schemas/user.schemas";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userRequestSchema>;
type TUserResponse = z.infer<typeof userResponseSchema>;
type TUserUdpate = z.infer<typeof userUdpateSchema>;
type TUserUdpateRequest = DeepPartial<TUserRequest>
type TUserUpateResponse = DeepPartial<TUserRequest>

export { TUser, TUserRequest, TUserResponse, TUserUdpate, TUserUdpateRequest, TUserUpateResponse };
