import { Request, Response } from "express";

import db from "../../utils/db";

export const createForm = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const form = await db.form.create({
    data: {
      title,
      description,
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
      fields: true,
    },
  });

  return res.json(form);
};

export const updateForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const form = await db.form.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
    },
  });

  return res.json(form);
};

export const getForms = async (req: Request, res: Response) => {
  const forms = await db.form.findMany();

  return res.json(forms);
};

export const addFormField = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, title, description } = req.body;

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

  const formField = await db.formField.delete({
    where: {
      id: fieldId,
    },
  });

  return res.json(formField);
};

export const updateFormField = async (req: Request, res: Response) => {
  const { id, fieldId } = req.params;
  const { type, title, description } = req.body;

  const formField = await db.formField.update({
    where: {
      id: fieldId,
    },
    data: {
      type,
      title,
      description,
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
  });

  return res.json(formFields);
};

export const deleteForm = async (req: Request, res: Response) => {
  const { id } = req.params;

  const form = await db.form.delete({
    where: {
      id: id,
    },
  });

  return res.json(form);
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

  const formResponses = await db.formResponse.findMany({
    where: {
      formId: id,
    },
  });

  return res.json(formResponses);
};

export const deleteFormResponse = async (req: Request, res: Response) => {
  const { id, responseId } = req.params;

  const formResponse = await db.formResponse.delete({
    where: {
      id: responseId,
    },
  });

  return res.json(formResponse);
};
