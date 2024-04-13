import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateField } from "@/hooks";
import { FormField } from "@/types";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  field: FormField;
}

export default function TEXT(props: Props) {
  const [field, setField] = useState(props.field);
  const { mutate } = useUpdateField(field.formId, field.id);

  const handleDelete = () => {};

  const handleUpdate = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
    mutate({ ...field, [name]: value });
  };

  return (
    <div className="border p-4 bg-gray-100">
      <div className="flex items-center">
        <Input name="title" value={field.title} onChange={handleUpdate} />
        <Button className="ml-2" variant={"destructive"}>
          <Trash2 className="w-6 h-6" />
        </Button>
      </div>
      <Textarea
        name="description"
        rows={2}
        className="mt-2"
        value={field.description}
        onChange={handleUpdate}
      />
      <div className="flex justify-between mt-4">
        <p className="text-sm font-mono mt-2">Field Type: {field.type}</p>
        <div className="flex items-center space-x-2">
          <Switch
            id={`required-${field.id}`}
            checked={field.required}
            onCheckedChange={() => {
              console.log("Clicked");
              setField((prev) => ({ ...prev, required: !field.required }));
              mutate({ ...field, required: !field.required });
            }}
          />
          <Label htmlFor={`required-${field.id}`}>Required</Label>
        </div>
      </div>
    </div>
  );
}
