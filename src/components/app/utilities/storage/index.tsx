import { Icons } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { TabsList } from '@radix-ui/react-tabs';
import { SearchBar } from '../components/search-bar';
import TableData from '../components/file-table';
import ListFileCard from '../components/list-file';
import Link from 'next/link';
export default function StogarePage() {
    return (
        <div className="mt-5 rounded-lg bg-section p-2">
            <h1 className="text-2xl font-semibold leading-7">Stogare</h1>
            <div className="mt-5">
                <Tabs defaultValue="list" className="px-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2">
                        <TabsList>
                            <TabsTrigger value="list" className="data-[state=active]:bg-gray-600">
                                <Icons.squareMenu className="h-5 w-5" />
                            </TabsTrigger>
                            <TabsTrigger value="grid" className="data-[state=active]:bg-gray-600">
                                <Icons.layoutGrid className="h-5 w-5" />
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center space-x-2">
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                <Button variant="secondary" className="rounded-r-none">
                                    Select All
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="rounded-none border-x border-gray-600"
                                >
                                    Format
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="rounded-none border-r border-gray-600"
                                >
                                    Download
                                </Button>
                                <Button variant="secondary" className="rounded-l-none">
                                    Delete
                                </Button>
                            </div>
                            <Link href="/dashboard/storage/create">
                                <Button className="bg-orange-500 text-white hover:bg-orange-600">
                                    Create New
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <SearchBar />
                    <TabsContent value="list">
                        <TableData />
                    </TabsContent>
                    <TabsContent value="grid">
                        <ListFileCard />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
