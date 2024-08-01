import TabBar from "@/components/TabBar";

export default function TabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
