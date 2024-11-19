"use client";
import * as React from "react";
import { useMintOneContext } from "../../../../../contexts/mint-one";
import StepperNav from "./_components/stepper-nav";
import TemplateStep from "./_components/_mint-step/template";
import MetadataStep from "./_components/_mint-step/metadata";
import ResultStep from "./_components/_mint-step/result";
import PreviewStep from "./_components/_mint-step/preview";
import BasicStep from "./_components/_mint-step/basic";
import TransactionStep from "./_components/_mint-step/transaction";

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
