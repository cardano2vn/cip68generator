import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Images } from '@/components/common/images';

export default function ListImageCard() {
    const file = {
        name: 'VSDHBJCKJC.PNG',
        size: '2.34 MB',
        cid: 'QMBSCM6E6CR..VDDVMECRQT',
        date: '10/30/2023',
    };

    return (
        <div className="h-full w-full space-y-4 rounded-lg p-4">
            <div className="overflow-x-auto">
                <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {Array.from({ length: 12 }, () => file).map((file, index) => (
                        <div
                            key={index}
                            className="flex w-full max-w-md items-center justify-between rounded-lg bg-gray-800 p-2"
                        >
                            <div className="flex flex-grow items-center">
                                <Images.metadata className="mr-4 h-20 w-20 rounded object-cover" />
                                <span className="truncate text-lg text-white">fcghvjbk</span>
                            </div>
                            <Button variant="destructive" size="icon" className="ml-2">
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
