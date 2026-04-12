import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Header, Sidebar } from "@/components/layout";

export const DashboardLayout = () => {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="font-snpro flex flex-col h-screen">
      <Header setOpen={() => setOpen(true)} />
      <main className="w-full flex flex-1 overflow-hidden">
        <Sidebar setClose={() => setOpen(false)} open={open} />
        <Outlet />
      </main>
    </div>
  );
}