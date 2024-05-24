import { FormField } from "@/types";

import COMMON_INPUT from "./COMMON_INPUT";
import RADIO from "./RADIO";

interface Props {
  fields: FormField[];
}

export default function CurrentFields(props: Props) {
  return (
    <div className="space-y-8">
      {props.fields.map((field) => {
        switch (field.type) {
          case "TEXT":
            return <COMMON_INPUT key={field.id} field={field} />;
          case "NUMBER":
            return <COMMON_INPUT key={field.id} field={field} />;
          case "EMAIL":
            return <COMMON_INPUT key={field.id} field={field} />;
          case "TEXTAREA":
            return <COMMON_INPUT key={field.id} field={field} />;
          case "DATE":
            return <COMMON_INPUT key={field.id} field={field} />;
          case "RADIO":
            return <RADIO key={field.id} field={field} />;
          case "CHECKBOX":
            return <COMMON_INPUT key={field.id} field={field} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
