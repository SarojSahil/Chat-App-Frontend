import { useGetContact } from "@/features/contact/lib";
import type { Conversation } from "@/schema/Conversation";
import { User2 } from "lucide-react";
import type { FC } from "react";

type ChatNameProps = {
    conversation: Conversation
}

export const ConversationName: FC<ChatNameProps> = ({ conversation }) => {

    const { data: contacts } = useGetContact();
    const contact = contacts?.find(c => c.user.id === conversation.otherPerson.id);

    return (
        <div className="flex items-center gap-4">
            <div>
                <User2 className="rounded-full border border-gray-300 p-1" size={36} />
            </div>
            {
                contact
                    ?
                    <div className="text-lg font-medium">
                        {contact.name}
                    </div>
                    :
                    <div>
                        <div className="text-lg font-medium">+91 {conversation.otherPerson.phoneNumber}</div>
                        <div className="text-sm font-light text-neutral-400">~ {conversation.otherPerson.name}</div>
                    </div>
            }
        </div>
    );
}