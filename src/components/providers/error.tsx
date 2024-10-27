"use client";
import { PropsWithChildren } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ErrorClientProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();
  if (typeof window !== "undefined") {
    window.addEventListener("unhandledrejection", (event) => {
      toast({
        title: "Error",
        description: event.reason.message || "An unknown error occurred",
        variant: "destructive",
      });
    });
  }
  return children;
}
