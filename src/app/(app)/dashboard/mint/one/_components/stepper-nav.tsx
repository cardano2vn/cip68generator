import React from "react";
import { useMintOneContext } from "../_context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function StepperNav() {
  const { stepper, steps } = useMintOneContext();

  return (
    <nav aria-label="Checkout Steps" className="group my-4">
      <ol className="flex items-center justify-between gap-2">
        {stepper.all.map((step, index, array) => (
          <React.Fragment key={step.id}>
            <li className="flex items-center gap-4 flex-shrink-0">
              <Button
                type="button"
                role="tab"
                variant={
                  index <= stepper.current.index ? "default" : "secondary"
                }
                aria-current={
                  stepper.current.id === step.id ? "step" : undefined
                }
                aria-posinset={index + 1}
                aria-setsize={steps.length}
                aria-selected={stepper.current.id === step.id}
                className="flex size-10 items-center justify-center rounded-full"
                onClick={() => stepper.goTo(step.id)}
              >
                {index + 1}
              </Button>
              <span className="text-sm font-medium">{step.title}</span>
            </li>
            {index < array.length - 1 && (
              <Separator
                className={`flex-1 ${
                  index < stepper.current.index ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
