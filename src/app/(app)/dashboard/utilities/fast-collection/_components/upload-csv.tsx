/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useCSVReader } from "react-papaparse";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useUploadCsvContext } from "@/contexts/fast-collection";
import FileDisplay from "@/components/common/file-display";
import { isEmpty, isNil } from "lodash";

export default function CSVReader() {
  const { setCsvContent, uploadCsv } = useUploadCsvContext();
  const [error, setError] = React.useState<string | null>(null);
  const { CSVReader } = useCSVReader();
  return (
    <>
      <CSVReader
        onUploadAccepted={(result: any, file: File) => {
          try {
            if (!isEmpty(result.errors)) {
              throw new Error(result.errors[0][0].message);
            }
            setError(null);
            setCsvContent(file.name.replace(/\.csv$/, ""), result.data);
          } catch (e) {
            setError(e instanceof Error ? e.message : "unknown error");
          }
        }}
      >
        {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
          <div {...getRootProps()}>
            <div className="flex w-full items-center rounded-lg bg-gray-800 p-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-md bg-blue-600 p-2"
              >
                Upload File
              </label>
              <p className="ml-2 text-red-400"> {error && <p>{error}</p>}</p>
            </div>
            <div className="h-full w-full space-y-4 rounded-lg p-4">
              <div className="overflow-x-auto">
                <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {acceptedFile && (
                    <div className="flex w-full max-w-md items-center justify-between rounded-lg bg-gray-800 p-2">
                      <div className="flex flex-grow items-center">
                        <FileDisplay
                          src={""}
                          alt={acceptedFile.name}
                          type={acceptedFile.type}
                          className="mr-4 h-20 w-20 rounded object-cover"
                        />
                        <span className="truncate text-lg text-white">
                          {acceptedFile.name}
                        </span>
                      </div>
                      <Button
                        {...getRemoveFileProps()}
                        onClick={(event: Event) => {
                          getRemoveFileProps().onClick(event);
                          setCsvContent(null!, null!);
                          setError(null);
                        }}
                        variant="destructive"
                        size="icon"
                        className="ml-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CSVReader>
      <Button onClick={uploadCsv} disabled={!isNil(error)}>
        Upload
      </Button>
    </>
  );
}
