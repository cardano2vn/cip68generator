import { Button } from "@/components/ui/button";
import { FaBurn } from "react-icons/fa";

export default function BurnButton({ handleBurn }: { handleBurn: () => void }) {
  return (
    <Button onClick={handleBurn} className="w-full flex items-center gap-x-2">
      <FaBurn />
      <span>Make Burn</span>
    </Button>
  );
}
