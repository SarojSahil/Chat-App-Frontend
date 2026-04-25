import { useAuthStore } from "@/app/store/AuthStore";
import type { Message } from "@/schema/Conversation";
import type { FC } from "react";

type MessageCompProps = {
    message: Message
}

export const MessageComp: FC<MessageCompProps> = ({ message}) => {

    const userId = useAuthStore(state => state.auth?.userId);

    const convertToTimeString = (timestamp: string) => {
        const formatter = new Intl.DateTimeFormat("en-IN", {
            timeStyle: "short"
        });
        return formatter.format(new Date(timestamp));
    }

    return (
        <div className={`relative p-2 rounded-xl inset-shadow min-w-20 max-w-[70%] ${message.senderId === userId ? "ml-auto bg-green-200 rounded-tr-none " : "mr-auto bg-white rounded-tl-none "}`}>
            <p>{message.content}</p>
            <p className="text-sm text-neutral-700 font-light text-right">{convertToTimeString(message.createdAt)}</p>
            <span className={`absolute w-2 h-2  border-5 border-transparent ${message.senderId === userId ? "top-0 right-0 translate-x-full border-l-green-200 border-t-green-200" : "top-0 left-0 -translate-x-full border-r-white border-t-white"}`}></span>
        </div>
    );
}