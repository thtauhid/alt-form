import { Router } from "express";

import * as ctrl from "../controllers/authController";

const router = Router();

router.post("/token", ctrl.login);
router.post("/user", ctrl.createUser);
router.delete("/user", ctrl.deleteUser);
router.put("/user", ctrl.updateUser);

export default router;
