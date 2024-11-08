import JsonBuilder from "@/components/common/json-builder";
import { useMintOneContext } from "../../_context";
import { useJsonBuilderStore } from "@/components/common/json-builder/store";
import { Button } from "@/components/ui/button";
import { isEmpty, isNil } from "lodash";

export default function MetadataPage() {
  const { stepper, setMetadataToMint } = useMintOneContext();
  const { jsonContent } = useJsonBuilderStore();
  const handleNext = () => {
    if (!isNil(jsonContent) || !isEmpty(jsonContent)) {
      setMetadataToMint(jsonContent);
      stepper.next();
    }
  };
  return (
    <div>
      <JsonBuilder />
      <div className="flex justify-end gap-4">
        <Button
          variant="secondary"
          onClick={stepper.prev}
          disabled={stepper.isFirst}
        >
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
