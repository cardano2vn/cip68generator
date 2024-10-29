/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @next/next/no-img-element */
"use client";
import { toast } from "@/hooks/use-toast";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Upload, X } from "lucide-react";

interface ImagePickerProps {
  onChange?: (file: File) => void;
  onReset?: () => void;
  defaultValue?: {
    url: string;
  };
}

export const ImagePicker = ({
  onChange,
  onReset,
  defaultValue,
}: ImagePickerProps) => {
  const [preview, setPreview] = useState<string | null>(
    defaultValue?.url || null,
  );
  useEffect(() => {
    setPreview(defaultValue?.url || null);
  }, [defaultValue]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null | undefined) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File is too large",
          description: "Please upload a file smaller than 5 MB.",
          variant: "destructive",
        });
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Unsupported file format",
          description: "Please upload a JPEG, PNG, or WEBP file.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange && onChange(file);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onReset && onReset();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <div
      className={`relative rounded-md border border-dashed p-4 ${
        isDragging ? "border-primary" : "border-slate-300"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex">
        {preview ? (
          <img
            className="h-20 w-20 rounded-xl object-cover"
            alt="Preview"
            src={preview}
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-slate-100">
            <Upload className="h-6 w-6 text-slate-500" />
          </div>
        )}
        {preview && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3 z-10 text-slate-400 hover:bg-slate-100"
            onClick={handleReset}
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        <div className="flex flex-col justify-center px-5">
          <p className="mb-1 font-semibold text-slate-500">
            Choose avatar for Ticket and Certificate
          </p>
          <p className="text-sm text-slate-400">
            Use square photos for best quality
          </p>
        </div>
      </div>
      <Input
        ref={fileInputRef}
        accept="image/jpeg, image/png, image/webp"
        className="hidden"
        required={false}
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null;
          handleFileChange(file);
          e.target.value = "";
        }}
        type="file"
      />
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
      />
    </div>
  );
};
