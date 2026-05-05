import { useGetContact } from "@/features/contact/lib";
import type { Conversation } from "@/schema/Conversation";
import { User2 } from "lucide-react";
import type { FC } from "react";

type ChatNameProps = {
    conversation: Conversation
}

// export const ConversationName: FC<ChatNameProps> = ({ conversation }) => {

//     const { data: contacts } = useGetContact();
//     const contact = contacts?.find(c => c.user.id === conversation.otherPerson.id);

//     return (
//         <div className="flex items-center gap-4">
//             {
//                 contact?.user.profilePictureUrl
//                     ?
//                     <img src={"http://localhost" + contact.user.profilePictureUrl} className="w-8.5 h-8.5 rounded-full" />
//                     :
//                     <div className="rounded-full border p-1">
//                         <User2 />
//                     </div>
//             }
//             {
//                 contact
//                     ?
//                     <div className="text-lg font-medium">
//                         {contact.name}
//                     </div>
//                     :
//                     <div>
//                         <p className="text-lg font-medium leading-4.5 mb-1.5">+91 {conversation.otherPerson.phoneNumber}</p>
//                         <p className="text-sm leading-2.5 font-light text-neutral-400">~ {conversation.otherPerson.name}</p>
//                     </div>
//             }
//         </div>
//     );
// }

export const ConversationName: FC<ChatNameProps> = ({ conversation }) => {

    const { data: contacts } = useGetContact();
    const contact = contacts?.find(c => c.user.id === conversation.otherPerson.id);

    return (
        <div className="flex items-center gap-4 min-w-0">

            {/* Avatar */}
            {
                contact?.user.profilePictureUrl
                    ? (
                        <img
                            src={contact.user.profilePictureUrl}
                            className="w-12 h-12 rounded-full object-cover border border-zinc-200"
                        />
                    )
                    : (
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            <User2 size={24} />
                        </div>
                    )
            }

            {/* Name block */}
            {
                contact ? (
                    <div className="min-w-0">
                        <p className="text-lg font-semibold truncate">
                            {contact.name}
                        </p>
                    </div>
                ) : (
                    <div className="min-w-0">
                        <p className="text-lg font-semibold truncate">
                            +91 {conversation.otherPerson.phoneNumber}
                        </p>

                        <p className="text-base text-zinc-500 truncate">
                            ~ {conversation.otherPerson.name}
                        </p>
                    </div>
                )
            }

        </div>
    );
};