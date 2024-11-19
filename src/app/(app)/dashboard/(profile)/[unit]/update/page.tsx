"use client";
import * as React from "react";
import StepperNav from "../../_components/stepper-nav";
import { useUpdateContext } from "@/contexts/unit";
import {
  MetadataStep,
  PreviewStep,
  ResultStep,
  TransactionStep,
} from "../../_components/update-step";

export default function Page() {
  const { stepper } = useUpdateContext();

  return (
    <div className="py-8 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        <StepperNav />
        <div className="space-y-4">
          {stepper.switch({
            metadata: () => <MetadataStep />,
            preview: () => <PreviewStep />,
            transaction: () => <TransactionStep />,
            result: () => <ResultStep />,
          })}
        </div>
      </div>
    </div>
  );
}
