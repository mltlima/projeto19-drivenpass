import { Router } from "express";

import * as safenoteController from "../controllers/safenoteController.js";
import schemas from "../schemas/index.js";
import { validateSchema } from "../middlewares/schemasMiddleware.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const safenoteRouter = Router();

safenoteRouter.use(validateToken);

safenoteRouter.post("/safenote", validateSchema(schemas.safenoteSchema), safenoteController.newSafenote);
safenoteRouter.get("/safenote/:id", safenoteController.getSafenoteById);
safenoteRouter.get("/safenotes", safenoteController.getAllSafenotes);
safenoteRouter.delete("/safenote/:id", safenoteController.deleteSafenote);

export default safenoteRouter;