"use client";

import { uploadConfig } from "@/constants";
import { useToast } from "@/hooks/use-toast";

export default function FilePicker({
  setFiles,
  accept = "*/*",
  multiple = true,
}: {
  setFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}) {
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    if (files) {
      let size = 0;
      if (files.length > uploadConfig.maxFiles) {
        toast({
          title: "Error",
          description: `You can only upload a maximum of ${uploadConfig.maxFiles} files.`,
          variant: "destructive",
        });
        return;
      }
      Array.from(files).forEach((file) => {
        size += file.size;
      });
      if (size > 1024 * 1024 * uploadConfig.maxSize) {
        toast({
          title: "Error",
          description: `Total file size exceeds ${uploadConfig.maxSize}MB`,
          variant: "destructive",
        });
        return;
      }
      setFiles(Array.from(files));
    }
  };

  return (
    <div className="flex w-full items-center rounded-lg bg-gray-800 p-4">
      <label
        htmlFor="file-upload"
        className="cursor-pointer rounded-md bg-blue-600 p-2"
      >
        Upload File
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleFileUpload}
      />
    </div>
  );
}
