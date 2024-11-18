import JsonBuilder from "@/components/common/json-builder";
import { useJsonBuilderStore } from "@/components/common/json-builder/store";
import { Button } from "@/components/ui/button";
import { isEmpty, isNil } from "lodash";
import { useUpdateContext } from "../../_context";

export default function MetadataStep() {
  const { stepper, setMetadataToUpdate, defaultMetadata } = useUpdateContext();
  const { jsonContent } = useJsonBuilderStore();
  const handleNext = () => {
    if (!isNil(jsonContent) || !isEmpty(jsonContent)) {
      setMetadataToUpdate(jsonContent);
      stepper.next();
    }
  };
  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        <div className="flex flex-col space-y-2 text-left p-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Metadata Build
          </h1>
        </div>
        <JsonBuilder defaultJson={defaultMetadata} />
      </div>
      <div className="flex justify-end gap-4 mt-6">
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
