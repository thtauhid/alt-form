export type FieldTypes =
  | "TEXT"
  | "TEXTAREA"
  | "RADIO"
  | "CHECKBOX"
  | "SELECT"
  | "EMAIL"
  | "NUMBER"
  | "DATE";

export type FormField = {
  id: string;
  formId: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  options: string[];
  required: boolean;
  type: FieldTypes;
};

export type Form = {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
};

export type FormResponse = {
  id: string;
  form_id: string;
  fields: {
    id: string;
    value: string;
  }[];
};
