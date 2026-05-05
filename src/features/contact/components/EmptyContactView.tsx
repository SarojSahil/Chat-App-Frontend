import { User } from "lucide-react";

export const EmptyContactView = () => {

    return (
        <div className="flex-1 hidden lg:flex items-center justify-center bg-blue-100">

            <div className="text-center px-6">

                {/* Icon */}
                <div className="w-34 h-34 mx-auto rounded-full bg-blue-600 flex items-center justify-center mb-5">
                    <User size={40} className="text-white" />
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-zinc-900 mb-2">
                    Select a Contact
                </h2>

                {/* Subtitle */}
                <p className="text-zinc-700">
                    Choose a contact to start chatting
                </p>

            </div>

        </div>
    );
};