export type FieldTypes =
  | "TEXT"
  | "EMAIL"
  | "NUMBER"
  | "TEXTAREA"
  | "DATE"
  | "RADIO"
  | "CHECKBOX"
  | "SELECT";

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
