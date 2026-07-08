import { User } from "lucide-react";

export const EmptyContactList = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-16">

            <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-5">
                <User size={36} className="text-zinc-500" />
            </div>

            <h2 className="text-xl font-semibold text-zinc-900 mb-2">
                No Contacts Yet
            </h2>

            <p className="text-sm text-zinc-500 max-w-xs">
                Start building your network. Add your first contact to begin chatting.
            </p>

        </div>
    );
};