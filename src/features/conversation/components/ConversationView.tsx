import { FileText, MoreVertical, PhoneCall, SendHorizonal } from "lucide-react";
import { AutosizeTextarea, ConversationName } from "@/features/conversation/components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetConversations } from "@/features/conversation/lib";
import { useSendMessage } from "../lib/useSendMessage";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useGetMessages } from "../lib/useGetMessages";
import { useInView } from "react-intersection-observer";
import { Loader } from "@/components/common";
import { MessageComp } from "./MessageComp";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { getZego } from "@/lib";
import type { Conversation } from "@/schema";
import { useQueryClient } from "@tanstack/react-query";
import { Editor } from "@/features/editor/components";
import { toast } from "react-toastify";
import { useGenerateMessage } from "../lib/useGenerateMessage";

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

    const [editorVisible, setEditorVisible] = useState<boolean>(false);

    const { mutate: generateMessage, data: generatedMessage } = useGenerateMessage();

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

    useEffect(() => {
        if (formRef.current && generatedMessage && generatedMessage.message !== "") {
            formRef.current["message"].value = generatedMessage.message;
        }
    }, [generatedMessage]);

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const closeMenu = () => setMenuOpen(false);
        if (menuOpen) {
            window.addEventListener('click', closeMenu);
        }
        return () => window.removeEventListener('click', closeMenu);
    }, [menuOpen]);

    const getConversationId = () => {
        return conversation?.isVirtual ? undefined : conversation?.id;
    }

    const getReceiverId = () => {
        return conversation?.isVirtual ? conversation.otherPerson.id : undefined;
    }

    const handleSendMessage = (message: string) => {
        sendMessage({
            content: message,
            conversationId: getConversationId(),
            receiverId: getReceiverId(),
            type: editorVisible ? "DOC" : "TEXT"
        });

        if (editorVisible) {
            setEditorVisible(false);
        }
    }

    const getFormData = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSendMessage(formData.get("message") as string);
    }

    const improviseMessage = () => {
        const message = formRef.current?.["message"].value as string;
        if (!message || message === "") {
            toast.warn("Please enter some text!");
            return;
        }
        else {
            generateMessage({ message });
        }
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
        <>
            {
                (!editorVisible && conversation)
                &&
                <div id="conversationViewContainer" className="flex-1 flex flex-col bg-[url(/image.png)]">
                    <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-zinc-200">

                        <div className="flex-1 min-w-0">
                            <ConversationName conversation={conversation} />
                        </div>

                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMenuOpen(!menuOpen);
                                }}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Options"
                            >
                                <MoreVertical size={24} className="text-zinc-600" />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-60 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 py-1">
                                    <button
                                        onClick={handleCall}
                                        className="w-full text-lg flex items-center gap-3 px-4 py-2 text-zinc-700 hover:bg-blue-100 transition-colors"
                                    >
                                        <PhoneCall size={18} className="text-blue-600" />
                                        Start Call
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditorVisible(true);
                                            setMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-lg text-zinc-700 hover:bg-blue-100 transition-colors"
                                    >
                                        <FileText size={18} className="text-blue-600" />
                                        Show Editor
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            improviseMessage();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-lg text-zinc-700 hover:bg-blue-100 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#155dfc"><path d="m176-120-56-56 301-302-181-45 198-123-17-234 179 151 216-88-87 217 151 178-234-16-124 198-45-181-301 301Zm24-520-80-80 80-80 80 80-80 80Zm355 197 48-79 93 7-60-71 35-86-86 35-71-59 7 92-79 49 90 22 23 90Zm165 323-80-80 80-80 80 80-80 80ZM569-570Z" /></svg>
                                        Improvise message
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="flex-1 overflow-x-hidden overflow-y-auto flex flex-col-reverse gap-4 px-4 pb-4 bg-blue-100">
                        {
                            messageData?.pages.map(page => {
                                return page.content.map(msg => <MessageComp key={msg.id} message={msg} />)
                            })
                        }
                        <div ref={ref} className="h-4 shrink-0">
                            {isFetchingNextPage && <Loader />}
                        </div>
                    </div>
                    <form className="flex p-2 bg-blue-100 gap-2" onSubmit={getFormData} ref={formRef}>
                        <label htmlFor="message" className="sr-only">message</label>
                        <AutosizeTextarea name="message" id="message" />
                        <button className="bg-blue-600 active:scale-95 transition hover:bg-blue-700 text-white rounded-full h-12 w-12 grow-0 grid place-items-center">
                            <SendHorizonal size={24} />
                        </button>
                    </form>
                </div>
            }
            {
                editorVisible
                &&
                <Editor handleSendMessage={handleSendMessage} close={() => setEditorVisible(false)} />
            }
        </>
    );
}