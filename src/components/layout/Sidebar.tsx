import { useAuthStore } from "@/app/store/AuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { ContactRound, LogOut, MessagesSquare, X } from "lucide-react";
import { useState, type FC } from "react";
import { NavLink } from "react-router-dom";
import { ConsentModal } from "@/components/common";

type SidebarProps = {
  open: boolean,
  setClose: () => void
}

export const Sidebar: FC<SidebarProps> = ({ open, setClose }) => {

  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);

  const handleCancel = () => {
    setVisible(false);
  }

  const hanldeConsent = () => {
    setVisible(true);
  }

  const handleLogout = () => {
    useAuthStore.persist.clearStorage();
    useAuthStore.getState().clearAuth();
    queryClient.clear()
  }

  return (
    <>
      <aside className={`fixed top-0 left-0 w-60 h-full bg-white border-r border-r-gray-200 z-20 sm:w-48 sm:static transition duration-150 ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-0`}>
        <div className="flex justify-end sm:hidden m-4">
          <button
            aria-label="Close Navbar"
            onClick={setClose}>
            <X />
          </button>
        </div>
        <div className="flex flex-col">
          <NavLink to={"/dashboard/contacts"} onClick={setClose} className={({ isActive }) => `${isActive && "text-green-600"} flex items-center gap-2 py-3 px-4 hover:bg-gray-200`}><ContactRound />Contacts</NavLink>
          <NavLink to={"/dashboard/conversations"} onClick={setClose} className={({ isActive }) => `${isActive && "text-green-600"} flex items-center gap-2 py-3 px-4 hover:bg-gray-200`}><MessagesSquare />Conversations</NavLink>
          <button onClick={hanldeConsent} className="text-red-500 flex items-center gap-2 py-3 px-4 hover:bg-gray-200"><LogOut /> Logout</button>
        </div>
      </aside>
      <div className={`fixed inset-0 z-10 bg-black/50 sm:static ${open ? "block" : "hidden"}`} onClick={setClose}></div >
      <ConsentModal
        open={visible}
        handleCancel={handleCancel}
        handleAction={handleLogout}
        title="Logout?"
        message="Are you sure want to logout?"
        action="Logout"
      />
    </>
  );
}