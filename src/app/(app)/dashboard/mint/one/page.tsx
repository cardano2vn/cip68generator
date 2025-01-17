"use client";
import * as React from "react";
import { useMintOneContext } from "@/contexts/mint-one";
import { BasicStep, MetadataStep, PreviewStep, ResultStep, TransactionStep } from "../_components/mint-step";
import StepperNav from "../_components/stepper-nav";
import { useEffect } from "react";
import { isNil } from "lodash";

export default function Page() {
  const {
    mintOneSteps,
    mintOneStepper,
    metadataToMint,
    basicInfoToMint,
    metadataTemplate,
    collectionToSave,
    tasks,
    txhash,
    setBasicInfoToMint,
    setMetadataToMint,
    startMinting,
    setCollectionToSave,
  } = useMintOneContext();

  useEffect(() => {
    if (!isNil(metadataTemplate)) {
      setMetadataToMint(metadataTemplate);
    }
  }, [metadataTemplate, setMetadataToMint]);

  return (
    <div className="pt-8 pb-20 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        <h1 className="text-2xl font-medium leading-7 text-center">Mint Steps</h1>

        <StepperNav stepper={mintOneStepper} steps={mintOneSteps} />
        <div className="space-y-4">
          {mintOneStepper.switch({
            basic: () => <BasicStep stepper={mintOneStepper} setBasicInfoToMint={setBasicInfoToMint} basicInfoToMint={basicInfoToMint} />,
            metadata: () => <MetadataStep stepper={mintOneStepper} setMetadataToMint={setMetadataToMint} metadataToMint={metadataToMint} />,
            preview: () => (
              <PreviewStep
                stepper={mintOneStepper}
                metadataToMint={metadataToMint}
                basicInfoToMint={basicInfoToMint}
                startMinting={startMinting}
                collectionToSave={collectionToSave}
                setCollectionToSave={setCollectionToSave}
              />
            ),
            transaction: () => <TransactionStep stepper={mintOneStepper} tasks={tasks} />,
            result: () => <ResultStep txhash={txhash} />,
          })}
        </div>
      </div>
    </div>
  );
}
