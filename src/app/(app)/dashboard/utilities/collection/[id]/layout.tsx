import MetadataProvider from "@/contexts/metadata";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const collectionId = (await params).id;
  return (
    <MetadataProvider collectionId={collectionId}>{children}</MetadataProvider>
  );
}
