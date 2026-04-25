import { SendHorizonal } from "lucide-react";
import { AutosizeTextarea, ConversationName } from "@/features/conversation/components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetConversations } from "@/features/conversation/lib";
import { useSendMessage } from "../lib/useSendMessage";
import { useEffect, useState, type SyntheticEvent } from "react";
import { useGetMessages } from "../lib/useGetMessages";
import { useInView } from "react-intersection-observer";
import { Loader } from "@/components/common";
import { MessageComp } from "./MessageComp";

export const ConversationView = () => {

    const { id } = useParams();
    const conversationId = Number(id);

    const { data: conversations } = useGetConversations();
    const conversation = conversations?.find(c => c.id === conversationId);

    const [willFetch, setFetch] = useState<boolean>(false);

    const { mutate: sendMessage, data: newConversation } = useSendMessage();
    const { data: messageData, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMessages({ conversationId, enabled: willFetch });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (conversationId && conversationId !== -1) {
            setFetch(true);
        } else {
            setFetch(false);
        }
    }, [conversationId]);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage]);

    const navigate = useNavigate();

    useEffect(() => {
        if (newConversation) {
            navigate(`/dashboard/conversation/${newConversation.id}`, { replace: true });
        }
    }, [newConversation]);

    const getConversationId = () => {
        return conversation?.isVirtual ? undefined : conversation?.id;
    }

    const getReceiverId = () => {
        return conversation?.isVirtual ? conversation.otherPerson.id : undefined;
    }

    const handleSendMessage = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        sendMessage({
            content: formData.get("message") as string,
            conversationId: getConversationId(),
            receiverId: getReceiverId()
        });
    }

    return (
        conversation
        &&
        <div className="flex-1 flex flex-col bg-gray-300">
            <div className="flex gap-2 items-center text-lg p-4 border-b border-b-gray-200 bg-white">
                <ConversationName conversation={conversation} />
            </div>
            <div className="flex-1 overflow-y-auto flex flex-col-reverse gap-2 px-4">
                {
                    messageData?.pages.map(page => {
                        return page.content.map(msg => <MessageComp key={msg.id} message={msg} />)
                    })
                }
                <div ref={ref} className="h-4 shrink-0">
                    {isFetchingNextPage && <Loader />}
                </div>
            </div>
            <form className="flex p-2 bg-transparent gap-2" onSubmit={handleSendMessage}>
                <label htmlFor="message" className="sr-only">message</label>
                <AutosizeTextarea name="message" id="message" />
                <button className="bg-green-500 hover:bg-green-700 text-white rounded-full p-2 self-end">
                    <SendHorizonal />
                </button>
            </form>
        </div>
    );
}