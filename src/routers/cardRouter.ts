import { Router } from "express";

import * as cardController from "../controllers/cardController.js";
import schemas from "../schemas/index.js";
import { validateSchema } from "../middlewares/schemasMiddleware.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const cardRouter = Router();

cardRouter.use(validateToken);

cardRouter.post("/card", validateSchema(schemas.cardSchema), cardController.newCard);
cardRouter.get("/card/:id", cardController.getCardById);
cardRouter.get("/cards", cardController.getAllCards);
cardRouter.delete("/card/:id", cardController.deleteCard);

export default cardRouter;