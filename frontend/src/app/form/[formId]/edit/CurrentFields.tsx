import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/types";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  fields: FormField[];
}

export default function CurrentFields(props: Props) {
  return (
    <div className="space-y-8">
      {props.fields.map((field) => {
        switch (field.type) {
          case "TEXT":
            return (
              <div key={field.id} className="border p-4 bg-gray-100">
                <div className="flex items-center">
                  <Input value={field.title} />
                  <Button className="ml-2" variant={"destructive"}>
                    <Trash2 className="w-6 h-6" />
                  </Button>
                </div>
                <Textarea rows={2} className="mt-2" value={field.description} />
                <div className="flex justify-between mt-4">
                  <p className="text-sm font-mono mt-2">
                    Field Type: {field.type}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`required-${field.id}`}
                      checked={field.required}
                    />
                    <Label htmlFor={`required-${field.id}`}>Required</Label>
                  </div>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
