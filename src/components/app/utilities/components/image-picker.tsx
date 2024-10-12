'use client';
export default function ImagePicker({ setFiles }: { setFiles: (files: File[]) => void }) {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files;
        if (files) {
            setFiles(Array.from(files));
        }
    };

    return (
        <div className="flex w-full items-center rounded-lg bg-gray-800 p-4">
            <label htmlFor="file-upload" className="cursor-pointer rounded-md bg-blue-600 p-2">
                Upload File
            </label>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileUpload}
            />
        </div>
    );
}
