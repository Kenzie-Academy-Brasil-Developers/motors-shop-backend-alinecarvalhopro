import { z } from "zod";

const addressSchema = z.object({
  id: z.string(),
  cep: z.string().max(8),
  state: z.string().max(2),
  city: z.string().max(30),
  street: z.string().max(100),
  number: z.string().max(8),
  complement: z.string().max(50).nullish(),
});

const addressRequestSchema = addressSchema.omit({ id: true });

const addressUpdateSchema = addressRequestSchema.partial();

export { addressSchema, addressUpdateSchema, addressRequestSchema };
