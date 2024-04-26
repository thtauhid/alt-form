import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormField as FormFieldType } from "@/types";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  form: UseFormReturn<FieldValues, any, undefined>;
  field: FormFieldType;
}

export default function CHECKBOX(props: Props) {
  return (
    <FormField
      control={props.form.control}
      key={props.field.id}
      name={props.field.title}
      defaultValue={false}
      render={({ field: fieldx }) => (
        <FormItem>
          <FormLabel>{props.field.title}</FormLabel>
          <FormDescription>{props.field.description}</FormDescription>
          <FormControl>
            <Checkbox
              {...fieldx}
              required={props.field.required}
              onCheckedChange={(checked) => {
                fieldx.onChange(checked);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
