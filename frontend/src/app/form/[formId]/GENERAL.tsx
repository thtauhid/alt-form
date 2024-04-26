import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormField as FormFieldType } from "@/types";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<FieldValues, any, undefined>;
  field: FormFieldType;
}

export default function GENERAL(props: Props) {
  return (
    <FormField
      control={props.form.control}
      key={props.field.id}
      name={props.field.title}
      render={({ field: fieldx }) => (
        <FormItem>
          <FormLabel>{props.field.title}</FormLabel>
          <FormDescription>{props.field.description}</FormDescription>
          <FormControl>
            <Input
              {...fieldx}
              required={props.field.required}
              type={props.field.type.toLocaleLowerCase()}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
