"use client";
import * as React from "react";
import { useMintOneContext } from "@/contexts/mint-one";
import StepperNav from "../_components/stepper-nav";
import {
  BasicStep,
  MetadataStep,
  PreviewStep,
  ResultStep,
  TemplateStep,
  TransactionStep,
} from "../_components/mint-step";

export default function Page() {
  const { stepper } = useMintOneContext();

  return (
    <div className="py-8 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        <StepperNav />
        <div className="space-y-4">
          {stepper.switch({
            template: () => <TemplateStep />,
            basic: () => <BasicStep />,
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
