import { Router } from "express";

import * as wifiController from "../controllers/wifiController.js";
import schemas from "../schemas/index.js";
import { validateSchema } from "../middlewares/schemasMiddleware.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const wifiRouter = Router();

wifiRouter.use(validateToken);

wifiRouter.post("/wifi", validateSchema(schemas.wifiSchema), wifiController.newWifi);
wifiRouter.get("/wifi/:id", wifiController.getWifiById);
wifiRouter.get("/wifis", wifiController.getAllWifis);
wifiRouter.delete("/wifi/:id", wifiController.deleteWifi);

export default wifiRouter;