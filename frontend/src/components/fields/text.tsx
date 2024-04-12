import { FormField } from "@/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  data: FormField;
}

export default function TextField(props: Props) {
  return (
    <div className="border p-4">
      <Label>{props.data.name}</Label>
      <Input className="" placeholder={props.data.name} />
    </div>
  );
}
