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
    <div className="border rounded-md bg-[#4cc9f0]/30 border-blue-400/40 p-8">
      <FormField
        control={props.form.control}
        key={props.field.id}
        name={props.field.title}
        defaultValue={false}
        render={({ field: fieldx }) => (
          <FormItem>
            <div className="flex items-center gap-4">
              <FormControl>
                <Checkbox
                  {...fieldx}
                  required={props.field.required}
                  onCheckedChange={(checked) => {
                    fieldx.onChange(checked);
                  }}
                  className="h-8 w-8"
                />
              </FormControl>
              <div>
                <FormLabel>{props.field.title}</FormLabel>
                <FormDescription>{props.field.description}</FormDescription>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
