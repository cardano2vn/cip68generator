"use client";

import Image from "next/image";
import { useState } from "react";
import { FileText, File } from "lucide-react";

type FileDisplayProps = {
  src: string;
  alt: string;
  type: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  className?: string;
};

export default function FileDisplay({
  src,
  alt,
  type,
  objectFit = "cover",
  className = "",
}: FileDisplayProps) {
  const [error, setError] = useState(false);

  const getFileType = (mimeType: string): "image" | "text" | "other" => {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("text/")) return "text";
    return "other";
  };

  const fileType = getFileType(type);

  const renderContent = () => {
    switch (fileType) {
      case "image":
        return (
          <Image
            src={error ? "/images/common/placeholder.svg" : src}
            alt={alt}
            fill
            style={{ objectFit }}
            onError={() => setError(true)}
            className={`rounded-md ${className}`}
          />
        );
      case "text":
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <FileText size={48} className="text-gray-400" />
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <File size={48} className="text-gray-400" />
          </div>
        );
    }
  };

  return renderContent();
}
