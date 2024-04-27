import { Router } from "express";
import * as ctrl from "../controllers/form";

import auth from "../middlewares/auth";

const router = Router();

// getForms
router.get("/", auth, ctrl.getForms);

// getForm
router.get("/:id", auth, ctrl.getForm);

// createForm
router.post("/", auth, ctrl.createForm);

// updateForm
router.put("/:id", auth, ctrl.updateForm);

// deleteForm
router.delete("/:id", auth, ctrl.deleteForm);

// getFormFields
router.get("/:id/fields", auth, ctrl.getFormFields);

// addFormField
router.post("/:id/fields", auth, ctrl.addFormField);

// updateFormField
router.put("/:id/fields/:fieldId", auth, ctrl.updateFormField);

// deleteFormField
router.delete("/:id/fields/:fieldId", auth, ctrl.deleteFormField);

// getFormResponses
router.get("/:id/responses", auth, ctrl.getFormResponses);

// createFormResponse
router.post("/:id/responses", ctrl.createFormResponse);

// deleteFormResponse
router.delete("/:id/responses/:responseId", auth, ctrl.deleteFormResponse);

export default router;
