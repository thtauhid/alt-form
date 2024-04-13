export type FieldTypes = "TEXT";
// | "email" | "number" | "date" | "textarea";

export type FormField = {
  id: string;
  title: string;
  description: string;
  type: FieldTypes;
  required: boolean;
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
