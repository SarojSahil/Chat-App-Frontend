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

            <div className="flex items-center gap-3 font-bold text-2xl tracking-tight">
                <div className="mx-auto w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                Talksy
            </div>
        </header>
    );
}