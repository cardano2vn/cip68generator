"use client";
import { Button } from "@/components/ui/button";
import { Trash2, File } from "lucide-react";
import { useUploadContext } from "@/contexts/storage";
import Image from "next/image";

export default function MediaGirdtoUpload() {
  const { listFileToUpload, setListFileToUpload } = useUploadContext();
  const handleRemove = (index: number) => {
    setListFileToUpload(listFileToUpload.filter((_, i) => i !== index));
  };
  return (
    <div className="h-full w-full space-y-4 rounded-lg p-4">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {listFileToUpload.map((file, index) => (
            <div
              key={index}
              className="flex w-full max-w-md items-center justify-between rounded-lg bg-gray-800 p-2"
            >
              <div className="flex flex-grow items-center">
                {file.type.includes("image") ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={80}
                    height={80}
                    className="mr-4 h-20 w-20 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center bg-gray-800 rounded-md">
                    <File size={48} className="text-gray-400" />
                  </div>
                )}
                <span className="truncate text-lg text-white ml-4">
                  {file.name}
                </span>
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
