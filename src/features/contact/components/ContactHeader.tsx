import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const ContactHeader = () => {
    return (
        <div className="p-4 border-b border-b-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Contacts</h2>
            <Link to={"add"} className="hover:bg-green-600 cursor-pointer flex gap-2 bg-green-500 text-white p-2 rounded-md">
                <Plus />
                <span>Add Contact</span>
            </Link>
        </div>
    );
}