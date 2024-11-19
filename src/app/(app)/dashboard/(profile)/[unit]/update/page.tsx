"use client";
import * as React from "react";
import StepperNav from "../../_components/update-step/stepper-nav";
import {
  MetadataStep,
  PreviewStep,
  ResultStep,
  TransactionStep,
} from "../../_components/update-step";
import { useUnitContext } from "@/contexts/unit";

export default function Page() {
  const { updateStepper } = useUnitContext();

  return (
    <div className="py-8 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        <StepperNav />
        <div className="space-y-4">
          {updateStepper.switch({
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
