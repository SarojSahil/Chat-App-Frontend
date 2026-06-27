import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Header, Sidebar } from "@/components/layout";

export const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-dvh">
      <Header setOpen={() => setOpen(true)} />

      <main className="w-full flex flex-1 overflow-hidden">
        <Sidebar setClose={() => setOpen(false)} open={open} />
        <Outlet />
      </main>
    </div>
  );
};
