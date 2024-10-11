import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function CreateCollection() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-500 text-white hover:bg-orange-600">Create New</Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
                <div className="w-full max-w-md rounded-l p-6">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Title</Label>
                            <Input id="name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="link">Link</Label>
                            <Input id="link" />
                        </div>
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
