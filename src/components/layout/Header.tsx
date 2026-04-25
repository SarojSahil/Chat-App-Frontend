import { Menu } from "lucide-react";
import type { FC } from "react";

type HeaderProps = {
    setOpen: () => void
}

export const Header: FC<HeaderProps> = ({ setOpen }) => {

    return (
        <header className="h-20 px-4 flex items-center gap-4 bg-green-500 text-white font-semibold text-lg">
            <button
                aria-label="Open Navbar"
                className="sm:hidden"
                onClick={setOpen}>
                <Menu />
            </button>
            <div>Connect</div>
        </header>
    );
}