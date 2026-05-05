import { Menu } from "lucide-react";
import type { FC } from "react";

type HeaderProps = {
    setOpen: () => void
}

export const Header: FC<HeaderProps> = ({ setOpen }) => {

    return (
        <header className="h-20 px-5 flex items-center gap-4 text-blue-600 border-b border-zinc-200 bg-white shadow-sm">

            <button
                aria-label="Open Navbar"
                className="sm:hidden text-zinc-600 hover:text-emerald-500 transition p-2"
                onClick={setOpen}>
                <Menu size={22} />
            </button>

            <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
                <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-md">
                    💬
                </div>
                Connect
            </div>
        </header>
    );
}