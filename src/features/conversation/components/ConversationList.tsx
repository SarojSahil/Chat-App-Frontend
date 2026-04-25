import type { FC } from "react";
import { Link } from "react-router-dom";
import { ConversationName } from "@/features/conversation/components"
import type { Conversation } from "@/schema/Conversation";

type ConversationListProps = {
    conversations: Conversation[]
}

export const ConversationList: FC<ConversationListProps> = ({ conversations }) => {
    return (
        <div>
            {conversations.map((conversation) =>
                conversation.isVirtual
                ||
                <Link to={`/dashboard/conversation/${conversation.id}`} key={conversation.id} className="block px-4 py-2">
                    <ConversationName conversation={conversation} />
                </Link>
            )}
        </div>
    );
}