/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import ImagePicker from '../components/image-picker';
import ListImageCard from '../components/list-image';
import { Button } from '@/components/ui/button';
import { uploadIPFS } from '@/services/upload';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
} from '@/components/ui/alert-dialog';
export default function UploadIpfsPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [alert, showAlert] = useState<any>(null);
    const { toast } = useToast();
    const router = useRouter();
    const handleUpload = async () => {
        if (files) {
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('file', file);
            });
            uploadIPFS(formData).then(
                (response) => {
                    showAlert(response);
                },
                (error) => {
                    toast({
                        title: 'Error',
                        description: error.message,
                        variant: 'destructive',
                    });
                },
            );
        }
    };
    return (
        <>
            <AlertDialog
                open={alert != null}
                onOpenChange={(value) => {
                    if (value === false) {
                        showAlert(null);
                    }
                }}
            >
                <AlertDialogContent>
                    {JSON.stringify(alert)}
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => showAlert(null)}>
                            Continue upload
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => router.push('/dashboard/storage')}>
                            Go to Storage
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <div className="mt-5 rounded-lg bg-section p-4">
                <h1 className="text-2xl font-semibold leading-7">Stogare</h1>
                <p className="mb-4 text-gray-400">
                    Provide the images youd like to use. Make sure each image name is unique,
                    starting from 0 and going up. For example: 0.png, 1.png, 2.png, and so on.
                </p>
                <div className="mt-5">
                    <div className="px-4">
                        <ImagePicker setFiles={setFiles} />
                        {files.length > 0 && (
                            <>
                                <ListImageCard files={files} setFiles={setFiles} />
                                <Button onClick={handleUpload}>Upload</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
