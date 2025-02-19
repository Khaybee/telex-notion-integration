import { Router } from "express";
import { handleTelexWebhook } from "../telex/services/webhooks";

const router = Router();

router.post("/updates", handleTelexWebhook);

export default router;
