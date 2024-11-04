import { useMetadataContext } from "../_context/metadata";
import MetadataCard from "./metadata-card";

export default function MetadataGird() {
  const { loading, listMetadata } = useMetadataContext();
  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full space-y-4 rounded-lg p-4">
      <div className="overflow-x-auto">
        <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {listMetadata.map((item, index) => (
            <MetadataCard metadata={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
