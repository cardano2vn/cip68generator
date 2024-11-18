"use client";
import { Button } from "@/components/ui/button";
import { FaUps } from "react-icons/fa";
import { redirect } from "next/navigation";

export default function UpdateButton({ unit }: { unit: string }) {
  const handleUpdate = () => {
    redirect(`/dashboard/detail/${unit}/update`);
  };
  return (
    <Button
      onClick={handleUpdate}
      className="w-full flex items-center gap-x-2 bg-blue-500 hover:bg-blue-800"
    >
      <FaUps />
      <span>Update Metadata</span>
    </Button>
  );
}
