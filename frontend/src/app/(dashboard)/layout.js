"use client"
import AppSidebar from "@/components/sidebar/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MENU_ITEMS } from "@/config/navigation";
import { useAuthStore } from "@/store/authStore";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const { usuario, isLogged } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
const pathname = usePathname()
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLogged) {
      router.push("/login");
    }
  }, [mounted, isLogged, router]);

  if (!mounted) return null;

  const userRole = usuario?.rol || 1;
  const currentPage = MENU_ITEMS.find((item) => item.href === pathname)
  return (
     <SidebarProvider>
            <AppSidebar userRole={userRole} />
            <main className="flex flex-col flex-1 w-full min-h-screen bg-slate-50/50">
                <header className="flex h-16 items-center gap-3 px-4 border-b bg-white sticky top-0 z-10">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-5" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 text-sm">
                            {currentPage?.title || "Dashboard"}
                        </span>
                        <span className="text-xs text-slate-400">
                            {pathname}
                        </span>
                    </div>
                </header>
                <div className="p-6">{children}</div>
            </main>
        </SidebarProvider>
  );
}
