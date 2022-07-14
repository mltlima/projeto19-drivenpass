import { Router } from "express";

import * as credentialController from "../controllers/credentialController.js";
import schemas from "../schemas/index.js";
import { validateSchema } from "../middlewares/schemasMiddleware.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const credentialRouter = Router();

credentialRouter.use(validateToken);

credentialRouter.post("/credential", validateSchema(schemas.credentialSchema), credentialController.newCredential);

export default credentialRouter;