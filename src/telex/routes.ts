import { Router } from "express";
import { integrationJSON } from "./config/integrationJSON";
import { handleTelexWebhook } from "./services/webhooks";
const router = Router();


router.get("/", integrationJSON);
router.get("/updates", handleTelexWebhook);

export default router;
