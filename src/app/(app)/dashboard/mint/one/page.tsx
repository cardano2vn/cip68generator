"use client";
import * as React from "react";
import { useMintOneContext } from "./_context";
import StepperNav from "./_components/stepper-nav";
import TemplatePage from "./_components/_mint-step/template";
import MetadataPage from "./_components/_mint-step/metadata";
import ResultPage from "./_components/_mint-step/result";
// import StepperFooter from "./_components/stepper-footer";
import PreviewPage from "./_components/_mint-step/preview";

export default function Page() {
  const { stepper } = useMintOneContext();

  return (
    <div className="py-8 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        <h1 className="text-2xl font-medium leading-7">Mint</h1>
        <StepperNav />
        <div className="space-y-4">
          {stepper.switch({
            template: () => <TemplatePage />,
            metadata: () => <MetadataPage />,
            preview: () => <PreviewPage />,
            result: () => <ResultPage />,
          })}
          {/* <StepperFooter /> */}
        </div>
      </div>
    </div>
  );
}
