'use client';
import { useState } from 'react';
import ImagePicker from '../components/image-picker';
import ListImageCard from '../components/list-image';
import { Button } from '@/components/ui/button';
import { uploadIPFS } from '@/services/upload';
export default function UploadIpfsPage() {
    const [files, setFiles] = useState<File[]>([]);

    const handleUpload = async () => {
        if (files) {
            const formData = new FormData();
            const pinataMetadata = JSON.stringify({
                name: `ipfs-upload-${new Date().toISOString()}`,
            });
            formData.append('pinataMetadata', pinataMetadata);
            Array.from(files).forEach((file) => {
                formData.append('file', file);
            });
            uploadIPFS(formData).then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.error(error);
                },
            );
        }
    };
    return (
        <div className="mt-5 rounded-lg bg-section p-4">
            <h1 className="text-2xl font-semibold leading-7">Stogare</h1>
            <p className="mb-4 text-gray-400">
                Provide the images youd like to use. Make sure each image name is unique, starting
                from 0 and going up. For example: 0.png, 1.png, 2.png, and so on.
            </p>
            <div className="mt-5">
                <div className="px-4">
                    <ImagePicker setFiles={setFiles} />
                    {files && <ListImageCard files={files} setFiles={setFiles} />}
                    <Button onClick={handleUpload}>Upload</Button>
                </div>
            </div>
        </div>
    );
}
