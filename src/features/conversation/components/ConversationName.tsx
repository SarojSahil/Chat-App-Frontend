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
            <div className="border rounded-full p-1" >
                <User2 />
            </div>
            {
                contact
                    ?
                    <div className="text-lg font-medium">
                        {contact.name}
                    </div>
                    :
                    <div>
                        <p className="text-lg font-medium">+91 {conversation.otherPerson.phoneNumber}</p>
                        <p className="text-sm font-light text-neutral-400">~ {conversation.otherPerson.name}</p>
                    </div>
            }
        </div>
    );
}