import FolderCard from "./folder-card";

export default function ListFolderCard() {
  const file = {
    name: "VSDHBJCKJC.PNG",
    size: "2.34 MB",
    cid: "QMBSCM6E6CR..VDDVMECRQT",
    date: "10/30/2023",
  };

  return (
    <div className="h-[60vh] w-full space-y-4 rounded-lg p-4">
      <div className="overflow-x-auto">
        <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }, () => file).map((file, index) => (
            <FolderCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
