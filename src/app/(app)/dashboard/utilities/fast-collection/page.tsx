import CSVReader from "./_components/upload-csv";
export default function UploadCSVPage() {
  return (
    <>
      <div className="mt-5 rounded-lg bg-section p-4">
        <h1 className="text-2xl font-semibold leading-7">Stogare</h1>
        <p className="mb-4 text-gray-400">Upload .csv file</p>
        <div className="mt-5">
          <div className="px-4">
            <CSVReader />
          </div>
        </div>
      </div>
    </>
  );
}
