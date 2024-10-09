/* eslint-disable @next/next/no-img-element */

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import FileCard from './file-card';

export default function ListFileCard() {
    const file = {
        name: 'VSDHBJCKJC.PNG',
        size: '2.34 MB',
        cid: 'QMBSCM6E6CR..VDDVMECRQT',
        date: '10/30/2023',
    };

    return (
        <div className="w-full space-y-4 rounded-lg p-4">
            <div className="overflow-x-auto">
                <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 12 }, () => file).map((file, index) => (
                        <FileCard key={index} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                <Button variant="link" className="text-sm font-semibold sm:text-base">
                    <span>Document</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2 rounded-lg p-1">
                    <Button variant="ghost" size="icon" className="hover: h-8 w-8">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                        Page <span className="font-medium">1</span> of{' '}
                        <span className="font-medium">20</span>
                    </span>
                    <Button variant="ghost" size="icon" className="hover: h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
