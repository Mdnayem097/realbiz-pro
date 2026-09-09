"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navber";
import Sidebar from "@/components/Sidebar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Pages like CRM module that provide their own full-page layout and sidebar
  const isStandalone = pathname?.startsWith("/crm-module");

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
