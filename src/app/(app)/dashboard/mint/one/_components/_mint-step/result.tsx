import { Button } from "@/components/ui/button";
import { useMintOneContext } from "../../_context";

export default function ResultStep() {
  const { stepper, metadataToMint, basicInfoToMint } = useMintOneContext();

  const input = {
    assetName: basicInfoToMint.assetName,
    quantity: basicInfoToMint.quantity,
    metadata: metadataToMint,
  };

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed h-full p-2">
        <pre>{JSON.stringify(input, null, 2)}</pre>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="secondary"
          onClick={stepper.prev}
          disabled={stepper.isFirst}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
