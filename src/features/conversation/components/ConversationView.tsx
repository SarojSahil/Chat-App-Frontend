import { PhoneCall, SendHorizonal } from "lucide-react";
import { AutosizeTextarea, ConversationName } from "@/features/conversation/components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetConversations } from "@/features/conversation/lib";
import { useSendMessage } from "../lib/useSendMessage";
import { useEffect, useRef, type SyntheticEvent } from "react";
import { useGetMessages } from "../lib/useGetMessages";
import { useInView } from "react-intersection-observer";
import { Loader } from "@/components/common";
import { MessageComp } from "./MessageComp";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { getZego } from "@/lib";

export const ConversationView = () => {

    const { id } = useParams();
    const conversationId = Number(id);

    const { data: conversations } = useGetConversations();
    const conversation = conversations?.find(c => c.id === conversationId);

    const { mutate: sendMessage, data: newConversation, isSuccess } = useSendMessage();
    const { data: messageData, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMessages({ conversationId, enabled: !!(conversationId && conversationId !== -1) });

    const { ref, inView } = useInView();

    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage]);


    useEffect(() => {
        if (newConversation) {
            navigate(`/dashboard/conversation/${newConversation.id}`, { replace: true });
        }
    }, [newConversation]);

    useEffect(() => {
        if (isSuccess && formRef.current) {
            formRef.current.reset();
        }
    }, [isSuccess]);

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

    const handleCall = () => {
        const zp = getZego();
        if (!zp || !conversation) return;

        const roomID = "chat_" + conversationId;

        zp.sendCallInvitation({
            callees: [
                {
                    userID: conversation.otherPerson.id.toString(),
                    userName: conversation.otherPerson.name,
                },
            ],
            callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
            roomID,
        });
    };

    return (
        conversation
        &&
        <div className="flex-1 flex flex-col bg-gray-300">
            <div className="flex justify-between items-center text-lg p-4 border-b border-b-gray-200 bg-white">
                <ConversationName conversation={conversation} />
                <div className="flex gap-2">
                    <button onClick={handleCall} className="border cursor-pointer rounded-full p-1 hover:bg-gray-100">
                        <PhoneCall />
                    </button>
                </div>
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
            <form className="flex p-2 bg-transparent gap-2" onSubmit={handleSendMessage} ref={formRef}>
                <label htmlFor="message" className="sr-only">message</label>
                <AutosizeTextarea name="message" id="message" />
                <button className="bg-green-500 hover:bg-green-700 text-white rounded-full p-2 self-end">
                    <SendHorizonal />
                </button>
            </form>
        </div>
    );
}
