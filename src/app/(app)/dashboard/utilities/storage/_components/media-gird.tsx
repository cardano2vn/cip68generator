import FileCard from "./file-card";
import { useUploadContext } from "@/contexts/storage";

export default function MediaGird() {
  const { loading, listMedia } = useUploadContext();
  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full space-y-4 rounded-lg p-4">
      <div className="overflow-x-auto">
        <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {listMedia.map((file, index) => (
            <FileCard file={file} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
