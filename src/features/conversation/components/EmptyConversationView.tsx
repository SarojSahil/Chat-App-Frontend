import { MessageCircle } from "lucide-react";

export const EmptyConversationView = () => {
    return (
        <div className="hidden lg:flex flex-1 items-center justify-center bg-blue-200">

            <div className="text-center px-6">

                <div className="w-34 h-34 mx-auto rounded-full bg-blue-600 flex items-center justify-center mb-5">
                    <MessageCircle size={40} className="text-white" />
                </div>

                <h2 className="text-lg font-semibold text-zinc-900 mb-2">
                    Select a Conversation
                </h2>

                <p className="text-zinc-700">
                    Choose a chat to start messaging
                </p>

            </div>

        </div>
    );
};