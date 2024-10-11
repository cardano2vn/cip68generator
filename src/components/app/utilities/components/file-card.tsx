import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Images } from '@/components/common/images';

export default function FileCard() {
    return (
        <Card className="rounded-lg p-2">
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Checkbox id="file-select" className="h-4 w-4 rounded-full" />
                    <label htmlFor="file-select" className="cursor-pointer truncate text-sm">
                        File name...
                    </label>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <MoreVertical className="h-5 w-5" />
                </Button>
            </div>
            <AspectRatio ratio={4 / 3} className="bg-muted">
                <Images.metadata className="h-full w-full object-cover" />
            </AspectRatio>
        </Card>
    );
}
