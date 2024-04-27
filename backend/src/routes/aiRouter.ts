import { Router } from "express";
import * as ctrl from "../controllers/aiController";

const router = Router();

router.post("/", ctrl.askAI);

export default router;
