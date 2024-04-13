"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddField } from "@/hooks";
import { useState } from "react";

interface Props {
  formId: string;
}

export default function AddField(props: Props) {
  const { mutate } = useAddField(props.formId);
  const [fieldType, setFieldType] = useState("TEXT");
  const [fieldTitle, setFieldTitle] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");

  return (
    <div className="border-2 border-dashed p-4 bg-gray-100">
      <div>
        <Input
          type="text"
          className="w-full p-2 border"
          placeholder="Field Title"
          onChange={(e) => setFieldTitle(e.target.value)}
        />

        <Textarea
          className="w-full p-2 border mt-2"
          placeholder="Field Description"
          onChange={(e) => setFieldDescription(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <select
          name="new_field"
          id=""
          className="w-full p-2 border"
          onChange={(e) => setFieldType(e.target.value)}
          defaultValue="TEXT"
        >
          <option value="TEXT">TEXT</option>
          <option value="EMAIL">EMAIL</option>
        </select>

        <Button
          className="w-full"
          onClick={() => {
            mutate({
              title: fieldTitle,
              type: fieldType,
              description: fieldDescription,
            });
          }}
        >
          Add Field
        </Button>
      </div>
    </div>
  );
}
