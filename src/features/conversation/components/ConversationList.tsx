import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { ConversationName } from "@/features/conversation/components"
import type { Conversation } from "@/schema/Conversation";

type ConversationListProps = {
    conversations: Conversation[]
}

export const ConversationList: FC<ConversationListProps> = ({ conversations }) => {
    return (
        <div className="bg-white">

            {conversations.map((conversation) =>
                conversation.isVirtual ? null : (
                    <NavLink
                        key={conversation.id}
                        to={`/dashboard/conversation/${conversation.id}`}
                        className={({ isActive }) => `${isActive && "bg-blue-100 text-blue-600 "} flex items-center justify-between gap-4 px-4 py-4 border-b border-zinc-200 hover:bg-blue-100 active:bg-zinc-100 transition`} >

                        <div className="min-w-0 flex-1">
                            <ConversationName conversation={conversation} />
                        </div>

                        {conversation.hasNewMessage && (
                            <span className="shrink-0 text-xs font-semibold text-white bg-blue-600 px-2.5 py-1 rounded-full">
                                New
                            </span>
                        )}

                    </NavLink>
                )
            )}

        </div>
    );
};