import { Button } from "@/components/ui/button";

export default function AddField() {
  return (
    <div className="border-2 border-dashed p-4 grid grid-cols-2 gap-2 bg-gray-100">
      <select name="new_field" id="" className="w-full p-2 border">
        <option value="text">Text</option>
        <option value="email">Email</option>
      </select>

      <Button className="w-full">Add Field</Button>
    </div>
  );
}
