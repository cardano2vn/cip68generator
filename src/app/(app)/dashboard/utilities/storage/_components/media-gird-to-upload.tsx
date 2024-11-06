"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useUploadContext } from "../_context";
import FileDisplay from "@/components/common/file-display";

export default function MediaGirdtoUpload() {
  const { listFileToUpload, setListFileToUpload } = useUploadContext();
  const handleRemove = (index: number) => {
    setListFileToUpload(listFileToUpload.filter((_, i) => i !== index));
  };
  return (
    <div className="h-full w-full space-y-4 rounded-lg p-4">
      <div className="overflow-x-auto">
        <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {listFileToUpload.map((file, index) => (
            <div
              key={index}
              className="flex w-full max-w-md items-center justify-between rounded-lg bg-gray-800 p-2"
            >
              <div className="flex flex-grow items-center">
                <FileDisplay
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  type={file.type}
                  className="mr-4 h-20 w-20 rounded object-cover"
                />
                <span className="truncate text-lg text-white">{file.name}</span>
              </div>
              <Button
                onClick={() => handleRemove(index)}
                variant="destructive"
                size="icon"
                className="ml-2"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
