import { FormField } from "@/types";
import TEXT from "./TEXT";

interface Props {
  fields: FormField[];
}

export default function CurrentFields(props: Props) {
  return (
    <div className="space-y-8">
      {props.fields.map((field) => {
        switch (field.type) {
          case "TEXT":
            return <TEXT key={field.id} field={field} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
