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
import type { Conversation } from "@/schema";
import { useQueryClient } from "@tanstack/react-query";

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

    const queryClient = useQueryClient();

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
        if (conversation) {
            queryClient.setQueryData<Conversation[]>(["/api/conversation"], (oldData) => {
                if (!oldData) return oldData;

                return oldData.map(conv =>
                    conv.id === conversation.id
                        ? { ...conv, hasNewMessage: false }
                        : conv
                );
            });
        }
    }, [conversation]);

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
        <div id="conversationViewContainer" className="flex-1 flex flex-col bg-[url(/image.png)]">
            <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-zinc-200">

                {/* Left: user info */}
                <div className="flex-1 min-w-0">
                    <ConversationName conversation={conversation} />
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-2">

                    <button
                        onClick={handleCall}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-600 hover:text-white transition active:scale-85"
                        aria-label="Start call"
                    >
                        <PhoneCall size={24} />
                    </button>

                </div>

            </div>
            <div className="flex-1 overflow-y-auto flex flex-col-reverse gap-2 px-4 bg-blue-100">
                {
                    messageData?.pages.map(page => {
                        return page.content.map(msg => <MessageComp key={msg.id} message={msg} />)
                    })
                }
                <div ref={ref} className="h-4 shrink-0">
                    {isFetchingNextPage && <Loader />}
                </div>
            </div>
            <form className="flex p-2 bg-blue-100 gap-2" onSubmit={handleSendMessage} ref={formRef}>
                <label htmlFor="message" className="sr-only">message</label>
                <AutosizeTextarea name="message" id="message" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 w-12 grow-0 grid place-items-center">
                    <SendHorizonal size={24} />
                </button>
            </form>
        </div>
    );
}