"use client";
import * as React from "react";
import MetadataStep from "./_update-step/metadata";
import PreviewStep from "./_update-step/preview";
import TransactionStep from "./_update-step/transaction";
import ResultStep from "./_update-step/result";
import { useUpdateContext } from "../_context";
import StepperNav from "./_component/stepper-nav";

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
