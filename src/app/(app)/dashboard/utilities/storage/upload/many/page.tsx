"use client";
import { Button } from "@/components/ui/button";
import FilePicker from "../../../../../../../components/common/file-picker";
import { useUploadContext } from "@/contexts/storage";
import MediaGirdtoUpload from "../../_components/media-gird-to-upload";
export default function UploadFilePage() {
  const { listFileToUpload, setListFileToUpload, uploadFiles } =
    useUploadContext();

  return (
    <>
      <div className="mt-5 rounded-lg bg-section p-4">
        <h1 className="text-2xl font-semibold leading-7">Stogare</h1>
        <p className="mb-4 text-gray-400">
          Provide the images youd like to use. Make sure each image name is
          unique, starting from 0 and going up. For example: 0.png, 1.png,
          2.png, and so on.
        </p>
        <div className="mt-5">
          <div className="px-4">
            <FilePicker setFiles={setListFileToUpload} />
            {listFileToUpload.length > 0 && (
              <>
                <MediaGirdtoUpload />
                <Button onClick={uploadFiles}>Upload</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
