export type FieldTypes = "text";
// | "email" | "number" | "date" | "textarea";

export type FormField = {
  id: string;
  name: string;
  placeholder: string;
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
