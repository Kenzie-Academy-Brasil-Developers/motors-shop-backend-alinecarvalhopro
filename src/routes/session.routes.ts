import { Router } from "express";
import { sessionController } from "../controllers";

const sessionRouter = Router();

sessionRouter.post("", (request, response) =>
  sessionController.create(request, response)
);

export { sessionRouter };
