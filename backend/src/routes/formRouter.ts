import { Router } from "express";
import * as ctrl from "../controllers/form";

const router = Router();

// getForms
router.get("/", ctrl.getForms);

// getForm
router.get("/:id", ctrl.getForm);

// createForm
router.post("/", ctrl.createForm);

// updateForm
router.put("/:id", ctrl.updateForm);

// deleteForm
router.delete("/:id", ctrl.deleteForm);

// getFormFields
router.get("/:id/fields", ctrl.getFormFields);

// addFormField
router.post("/:id/fields", ctrl.addFormField);

// updateFormField
router.put("/:id/fields/:fieldId", ctrl.updateFormField);

// deleteFormField
router.delete("/:id/fields/:fieldId", ctrl.deleteFormField);

// getFormResponses
router.get("/:id/responses", ctrl.getFormResponses);

// createFormResponse
router.post("/:id/responses", ctrl.createFormResponse);

// deleteFormResponse
router.delete("/:id/responses/:responseId", ctrl.deleteFormResponse);

export default router;
