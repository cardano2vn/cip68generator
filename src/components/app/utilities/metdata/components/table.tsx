import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Copy, MoreVertical, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function TableData() {
    const file = {
        name: 'VSDHBJCKJC.PNG',
        size: '2.34 MB',
        cid: 'QMBSCM6E6CR..VDDVMECRQT',
        date: '10/30/2023',
    };

    return (
        <div className="w-full space-y-4 rounded-lg p-4">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px] font-normal">NAME</TableHead>
                            <TableHead className="hidden font-normal md:table-cell">CID</TableHead>
                            <TableHead className="hidden font-normal sm:table-cell">DATE</TableHead>
                            <TableHead className="text-right font-normal">ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 10 }, () => file).map((file, index) => (
                            <TableRow key={index} className="mb-2 rounded-lg">
                                <TableCell className="rounded-l-lg font-medium">
                                    <div className="flex items-center space-x-4">
                                        <Checkbox
                                            id={`checkbox-${index}`}
                                            className="rounded-full"
                                        />
                                        <div className="h-10 w-10 overflow-hidden rounded-lg">
                                            <img
                                                src="https://placehold.co/40x40/EEE/31343C"
                                                alt="File thumbnail"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="">{file.name}</div>
                                            <div className="text-sm">{file.size}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex items-center space-x-2">
                                        <span className="">{file.cid}</span>
                                        <Copy className="h-5 w-5" />
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{file.date}</TableCell>
                                <TableCell className="rounded-r-lg text-right">
                                    <Button variant="ghost" size="icon" className="hover:">
                                        <MoreVertical className="h-5 w-5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
