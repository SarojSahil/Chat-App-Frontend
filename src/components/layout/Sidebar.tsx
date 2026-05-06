import { useAuthStore } from "@/app/store/AuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { ContactRound, LogOut, MessagesSquare, X } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { NavLink } from "react-router-dom";
import { ConsentModal } from "@/components/common";

type SidebarProps = {
  open: boolean,
  setClose: () => void
}

export const Sidebar: FC<SidebarProps> = ({ open, setClose }) => {

  const queryClient = useQueryClient();

  const [visible, setVisible] = useState<boolean>(false);
  const [isLoggedOut, setLoggedOut] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedOut) {
      setVisible(false);
      queryClient.clear()
      useAuthStore.persist.clearStorage();
      useAuthStore.getState().clearAuth();
    }
  }, [isLoggedOut]);

  return (
    <>
      <aside className={`text-lg fixed top-0 left-0 w-72 h-full bg-white border-r border-zinc-200 z-20 sm:w-64 sm:static transition duration-200 ease-out ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}>

        {/* Close */}
        <div className="flex justify-end sm:hidden p-4">
          <button
            aria-label="Close Navbar"
            className="text-zinc-500 hover:text-zinc-900 transition p-2"
            onClick={setClose}>
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col font-medium">

          <NavLink
            to={"/dashboard/contact"}
            onClick={setClose}
            className={({ isActive }) =>
              `${isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-100"
              } flex items-center gap-3 py-3.5 px-5 transition text-black`
            }
          >
            <ContactRound size={24} />
            Contacts
          </NavLink>

          <NavLink
            to={"/dashboard/conversation"}
            onClick={setClose}
            className={({ isActive }) =>
              `${isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-100"
              } flex items-center gap-3 py-3.5 px-5 transition text-black`
            }
          >
            <MessagesSquare size={24} />
            Conversations
          </NavLink>

          <button
            onClick={() => setVisible(true)}
            className="text-red-600 flex items-center gap-3 py-3.5 px-5 hover:bg-blue-100 transition"
          >
            <LogOut size={24} />
            Logout
          </button>
        </div>
      </aside>
      <div
        className={`fixed inset-0 z-10 bg-black/50 backdrop-blur-[1px] sm:hidden transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={setClose}
      />
      <ConsentModal
        open={visible}
        handleCancel={() => setVisible(false)}
        handleAction={() => setLoggedOut(true)}
        title="Logout?"
        message="Are you sure want to logout?"
        action="Logout"
      />
    </>
  );
}