import UpdateProvider from "@/contexts/unit";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ unit: string }>;
  children: React.ReactNode;
}) {
  const unit = (await params).unit;
  return <UpdateProvider unit={unit}>{children}</UpdateProvider>;
}
