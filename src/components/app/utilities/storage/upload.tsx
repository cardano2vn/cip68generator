import ListImageCard from '../components/list-image';
export default function UploadIpfsPage() {
    return (
        <div className="mt-5 rounded-lg bg-section p-4">
            <h1 className="text-2xl font-semibold leading-7">Stogare</h1>
            <p className="mb-4 text-gray-400">
                Provide the images youd like to use. Make sure each image name is unique, starting
                from 0 and going up. For example: 0.png, 1.png, 2.png, and so on.
            </p>
            <div className="mt-5">
                <div className="px-4">
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
                            multiple
                            // onChange={handleFileUpload}
                        />
                    </div>
                    <ListImageCard />
                </div>
            </div>
        </div>
    );
}
