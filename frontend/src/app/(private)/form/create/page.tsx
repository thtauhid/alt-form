import CreateForm from "./CreateForm";

export default function Page() {
  return (
    <div>
      <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-b-[#3c2a4d]">
        <h1 className="text-3xl font-bold">Create Form</h1>
      </div>

      <CreateForm />
    </div>
  );
}
