import { Router } from "express";

import * as documentController from "../controllers/documentController.js";
import schemas from "../schemas/index.js";
import { validateSchema } from "../middlewares/schemasMiddleware.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const documentRouter = Router();

documentRouter.use(validateToken);

documentRouter.post("/document", validateSchema(schemas.documentSchema), documentController.newDocument);
documentRouter.get("/document/:id", documentController.getDocumentById);
documentRouter.get("/documents", documentController.getAllDocuments);
documentRouter.delete("/document/:id", documentController.deleteDocument);

export default documentRouter;