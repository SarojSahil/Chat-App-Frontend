import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const ContactHeader = () => {
    return (
        <div className="relative px-4 py-4 flex items-center justify-between bg-white border-b border-zinc-200">

            <div>
                <h2 className="text-xl font-semibold text-zinc-900">
                    Your Contacts
                </h2>
                <p className="text-sm text-zinc-600">
                    Manage your connections
                </p>
            </div>

            <Link
                to={"/dashboard/contact/add"}
                className="p-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-80 transition"
            >
                <Plus size={24} />
            </Link>
        </div>
    );
};