import { Request, Response } from "express";

import db from "../utils/db";

export const createForm = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { id: createdById } = req.user;

  const form = await db.form.create({
    data: {
      title,
      description,
      createdById,
    },
  });

  return res.json(form);
};

export const getForm = async (req: Request, res: Response) => {
  const { id } = req.params;

  const form = await db.form.findUnique({
    where: {
      id: id,
    },

    include: {
      fields: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return res.json(form);
};

export const updateForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const { id: createdById } = req.user;

  // check if user is authorized to update form
  const form = await db.form.findUnique({
    where: {
      id,
    },
  });

  if (!form) throw new Error("Form not found");

  if (form.createdById !== createdById) throw new Error("Unauthorized");

  const updatedForm = await db.form.update({
    where: {
      id,
    },

    data: {
      title,
      description,
    },
  });

  return res.json(updatedForm);
};

export const getForms = async (req: Request, res: Response) => {
  const { id: createdById } = req.user;
  const forms = await db.form.findMany({
    where: {
      createdById,
    },

    include: {
      FormResponse: {
        select: {
          id: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(forms);
};

export const addFormField = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, title, description } = req.body;
  const { id: createdById } = req.user;

  // check if user is authorized to add field to form
  const form = await db.form.findUnique({
    where: {
      id,
    },
  });

  if (!form) throw new Error("Form not found");

  if (form.createdById !== createdById) throw new Error("Unauthorized");

  const formField = await db.formField.create({
    data: {
      type,
      title,
      description,
      formId: id,
    },
  });

  return res.json(formField);
};

export const deleteFormField = async (req: Request, res: Response) => {
  const { id, fieldId } = req.params;
  const { id: createdById } = req.user;

  // check if user is authorized to delete field from form
  const form = await db.form.findUnique({
    where: {
      id,
    },
  });

  if (!form) throw new Error("Form not found");

  if (form.createdById !== createdById) throw new Error("Unauthorized");

  const formField = await db.formField.delete({
    where: {
      id: fieldId,
    },
  });

  return res.json(formField);
};

export const updateFormField = async (req: Request, res: Response) => {
  const { id, fieldId } = req.params;
  const { type, title, description, required, options } = req.body;
  const { id: createdById } = req.user;

  // check if user is authorized to update field in form

  const form = await db.form.findUnique({
    where: {
      id,
    },
  });

  if (!form) throw new Error("Form not found");

  if (form.createdById !== createdById) throw new Error("Unauthorized");

  const formField = await db.formField.update({
    where: {
      id: fieldId,
    },

    data: {
      type,
      title,
      description,
      options,
      required,
    },
  });

  return res.json(formField);
};

export const getFormFields = async (req: Request, res: Response) => {
  const { id } = req.params;

  const formFields = await db.formField.findMany({
    where: {
      formId: id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return res.json(formFields);
};

export const deleteForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: createdById } = req.user;

  // check if user is authorized to delete form
  const form = await db.form.findUnique({
    where: {
      id,
    },
  });

  if (!form) throw new Error("Form not found");

  if (form.createdById !== createdById) throw new Error("Unauthorized");

  const deletedForm = await db.form.delete({
    where: {
      id: id,
    },
  });

  return res.json(deletedForm);
};

export const createFormResponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { response } = req.body;

  const formResponse = await db.formResponse.create({
    data: {
      response,
      formId: id,
    },
  });

  return res.json(formResponse);
};

export const getFormResponses = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: createdById } = req.user;

  // check if user is authorized to get responses for form
  const form = await db.form.findUnique({
    where: {
      id,
    },
  });

  if (!form) throw new Error("Form not found");

  if (form.createdById !== createdById) throw new Error("Unauthorized");

  const formResponses = await db.formResponse.findMany({
    where: {
      formId: id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(formResponses);
};

export const deleteFormResponse = async (req: Request, res: Response) => {
  const { id, responseId } = req.params;
  const { id: createdById } = req.user;

  // check if user is authorized to delete response for form
  const form = await db.form.findUnique({
    where: {
      id,
    },
  });

  if (!form) throw new Error("Form not found");

  if (form.createdById !== createdById) throw new Error("Unauthorized");

  const formResponse = await db.formResponse.delete({
    where: {
      id: responseId,
    },
  });

  return res.json(formResponse);
};
