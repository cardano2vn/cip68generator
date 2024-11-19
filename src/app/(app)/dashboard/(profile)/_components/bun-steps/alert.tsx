import { Button } from "@/components/ui/button";
import { useUnitContext } from "@/contexts/unit";

export default function MetadataStep() {
  const { startBurning } = useUnitContext();

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        <div className="flex flex-col space-y-2 text-left p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Are you absolutely sure?
          </h1>
          <p>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="secondary">Back</Button>
        <Button onClick={startBurning}>Next</Button>
      </div>
    </div>
  );
}
