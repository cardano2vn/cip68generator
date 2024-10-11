import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Images } from '@/components/common/images';
import Link from 'next/link';
export default function MintPage() {
    return (
        <div className="rounded-lg bg-section p-2">
            <h1 className="text-2xl font-semibold leading-7">Mint</h1>
            <div className="mt-2 grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
                <Link
                    href="/dashboard/mint-one"
                    className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-lg hover:shadow-teal-400"
                >
                    <Card>
                        <AspectRatio ratio={5 / 3} className="bg-muted">
                            <Images.metadata className="h-full w-full rounded-t-lg object-cover" />
                        </AspectRatio>
                        <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                            <div className="font-semibol self-stretch text-center text-base">
                                Metadata Builder
                            </div>
                            <div className="font- self-stretch text-center text-sm text-secondary">
                                Have images but need JSON? We got you covered!
                            </div>
                        </div>
                    </Card>
                </Link>
                <Link
                    href="/dashboard/mint-multiple"
                    className="rounded-lg shadow-none transition-shadow duration-300 hover:shadow-lg hover:shadow-teal-400"
                >
                    <Card>
                        <AspectRatio ratio={5 / 3} className="bg-muted">
                            <Images.metadata className="h-full w-full rounded-t-lg object-cover" />
                        </AspectRatio>
                        <div className="flex flex-col items-center justify-start gap-3 self-stretch px-4 py-2">
                            <div className="font-semibol self-stretch text-center text-base">
                                Metadata Builder
                            </div>
                            <div className="font- self-stretch text-center text-sm text-secondary">
                                Have images but need JSON? We got you covered!
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
