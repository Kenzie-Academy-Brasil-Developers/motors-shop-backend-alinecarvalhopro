import { z } from "zod";
import { addressRequestSchema } from "../schemas/address.schemas";
import { DeepPartial } from "typeorm";

type TAddressRequest = z.infer<typeof addressRequestSchema>;
type TAddressUpdate = DeepPartial<TAddressRequest>;

export { TAddressUpdate };
