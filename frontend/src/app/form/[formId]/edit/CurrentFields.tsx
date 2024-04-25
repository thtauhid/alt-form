import { FormField } from "@/types";
import TEXT from "./TEXT";
import NUMBER from "./NUMBER";
import EMAIL from "./EMAIL";

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
          case "NUMBER":
            return <NUMBER key={field.id} field={field} />;
          case "EMAIL":
            return <EMAIL key={field.id} field={field} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
