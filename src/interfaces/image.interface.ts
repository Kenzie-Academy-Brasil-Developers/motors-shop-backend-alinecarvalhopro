import { z } from "zod";
import { imageRequestSchema, imageSchema } from "../schemas/image.shemas";

type TImage = z.infer<typeof imageSchema>;
type TImageRequest = z.infer<typeof imageRequestSchema>;

export { TImage, TImageRequest };
