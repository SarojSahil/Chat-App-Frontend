import { useAuthStore } from "@/app/store/AuthStore";
import type { Message } from "@/schema/Conversation";
import type { FC } from "react";

type MessageCompProps = {
    message: Message
}

export const MessageComp: FC<MessageCompProps> = ({ message }) => {

    const userId = useAuthStore(state => state.auth?.userId);

    const convertToTimeString = (timestamp: string) => {
        return new Date(timestamp).toLocaleString("en-IN");
    }

    return (
        <div className={`relative p-3 text-lg rounded-xl inset-shadow max-w-[70%] shadow-md shadow-black/40 ${message.senderId === userId ? "ml-auto bg-blue-600 text-white rounded-tr-none " : "mr-auto bg-white rounded-tl-none "}`}>
            <p>{message.content}</p>
            <p className="text-xs font-light text-right">{convertToTimeString(message.createdAt)}</p>
            <span className={`absolute w-2 h-2 border-5 border-transparent ${message.senderId === userId ? "top-0 right-0 translate-x-full border-l-blue-600 border-t-blue-600" : "top-0 left-0 -translate-x-full border-r-white border-t-white"}`}></span>
        </div>
    );
}