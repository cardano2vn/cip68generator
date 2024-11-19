import { Button } from "@/components/ui/button";
import { FaUps } from "react-icons/fa";

export default function UpdateButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="w-full flex items-center gap-x-2 bg-blue-500 hover:bg-blue-800"
    >
      <FaUps />
      <span>Update Metadata</span>
    </Button>
  );
}
