import { AppHeader } from "@/components/layout/app-header";
import { SidePanel } from "@/components/layout/side-panel";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <div className="flex flex-1 container mx-auto max-w-7xl overflow-hidden">
        <SidePanel />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
