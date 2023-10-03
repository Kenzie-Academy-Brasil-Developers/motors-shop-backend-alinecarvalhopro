import { z } from "zod";
import { addressRequestSchema, addressUpdateSchema } from "./address.schemas";

const userSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  email: z.string().email().max(120),
  cpf: z.string().max(11),
  phone_number: z.string().max(11),
  birth: z.string(),
  description: z.string(),
  password: z.string().max(120),
  seller: z.boolean().nullish(),
  address: addressRequestSchema,
});

const userSchemaResponseUpdateAddress = z
  .object({
    id: z.string(),
    name: z.string().max(50),
    email: z.string().email().max(120),
    cpf: z.string().max(11),
    phone_number: z.string().max(11),
    birth: z.string(),
    description: z.string(),
    password: z.string().max(120),
    seller: z.boolean().nullish(),
    address: addressUpdateSchema,
  })
  .partial()
  .omit({
    password: true,
  });

const userSchemaResponseCreateAnnouncement = z
  .object({
    id: z.string(),
    name: z.string().max(50),
    email: z.string().email().max(120),
    cpf: z.string().max(11),
    phone_number: z.string().max(11),
    birth: z.string(),
    description: z.string(),
    password: z.string().max(120),
    seller: z.boolean().nullish(),
  })
  .omit({
    password: true,
  });

const userRequestSchema = userSchema.omit({
  id: true,
});

const userResponseSchema = userSchema.omit({
  password: true,
});

const userUdpateSchema = userRequestSchema.deepPartial();

const userUdpateResponseSchema = userRequestSchema.deepPartial().omit({
  password: true,
});

export {
  userSchema,
  userRequestSchema,
  userResponseSchema,
  userUdpateSchema,
  userUdpateResponseSchema,
  userSchemaResponseUpdateAddress,
  userSchemaResponseCreateAnnouncement,
};
