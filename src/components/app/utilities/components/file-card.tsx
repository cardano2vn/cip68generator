import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Media } from '@prisma/client';
import Image from 'next/image';
import { ipfsConfig } from '@/constants';

export default function FileCard({ file }: { file: Media }) {
    return (
        <Card className="rounded-lg p-2">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Checkbox id="file-select" className="h-4 w-4 rounded-full" />
                    <label htmlFor="file-select" className="cursor-pointer truncate text-sm">
                        {file.name}
                    </label>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </div>
            <AspectRatio ratio={4 / 3} className="bg-muted">
                <Image
                    src={ipfsConfig.gateway + file.url.replace('ipfs://', '')}
                    alt={file.name}
                    fill
                    className="h-full w-full rounded-lg border object-cover"
                />
            </AspectRatio>
        </Card>
    );
}
