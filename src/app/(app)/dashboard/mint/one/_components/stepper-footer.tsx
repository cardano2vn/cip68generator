import { Button } from "@/components/ui/button";
import { useMintOneContext } from "../_context";

export default function StepperFooter() {
  const { stepper } = useMintOneContext();

  return (
    <div className="flex justify-end gap-4">
      {!stepper.isLast ? (
        <>
          <Button
            variant="secondary"
            onClick={stepper.prev}
            disabled={stepper.isFirst}
          >
            Back
          </Button>
          <Button onClick={stepper.next}>
            {stepper.isLast ? "Complete" : "Next"}
          </Button>
        </>
      ) : (
        <Button onClick={stepper.reset}>Reset</Button>
      )}
    </div>
  );
}
