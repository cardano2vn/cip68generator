"use client";
import JsonBuilder from "@/components/common/json-builder";
import { useJsonBuilderStore } from "@/components/common/json-builder/store";
import { Button } from "@/components/ui/button";
import { isEmpty, isNil } from "lodash";
import { useMetadataContext } from "@/contexts/metadata";

export default function MetadataStep() {
  const { createMetadata } = useMetadataContext();

  const { jsonContent } = useJsonBuilderStore();
  const handleNext = () => {
    if (!isNil(jsonContent) || !isEmpty(jsonContent)) {
      createMetadata(jsonContent);
    }
  };
  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed">
        <JsonBuilder />
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={handleNext}>Create Metadata</Button>
      </div>
    </div>
  );
}
