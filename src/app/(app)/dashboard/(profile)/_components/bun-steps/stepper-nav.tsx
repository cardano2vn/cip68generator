import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils";
import { useUnitContext } from "@/contexts/unit";

export default function StepperNav() {
  const { burnStepper, burnSteps } = useUnitContext();

  return (
    <nav aria-label="Checkout Steps" className="group my-4">
      <ol className="flex items-center justify-between gap-2">
        {burnStepper.all.map((step, index, array) => (
          <React.Fragment key={step.id}>
            <li className="flex items-center gap-4 flex-shrink-0">
              <div
                role="tab"
                aria-current={
                  burnStepper.current.id === step.id ? "step" : undefined
                }
                aria-posinset={index + 1}
                aria-setsize={burnSteps.length}
                aria-selected={burnStepper.current.id === step.id}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full",
                  index <= burnStepper.current.index
                    ? "bg-primary text-white"
                    : "bg-muted text-muted",
                )}
              >
                {index + 1}
              </div>
              <span className="text-sm font-medium">{step.title}</span>
            </li>
            {index < array.length - 1 && (
              <Separator
                className={`flex-1 ${
                  index < burnStepper.current.index ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
