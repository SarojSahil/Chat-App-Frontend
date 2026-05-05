import { useAuthStore } from "@/app/store/AuthStore";
import { useStompClientStore } from "@/app/store/StompClientStore";
import type { Conversation, Message, Slice } from "@/schema/Conversation";
import { Client } from "@stomp/stompjs";
import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type StompClientProps = {
    token: string,
    queryClient: QueryClient
}

export const useInitializeStomp = ({ queryClient, token }: StompClientProps) => {

    const { client, setClient } = useStompClientStore();
    const { auth } = useAuthStore();

    if (client && (client.connected || client.active)) {
        return;
    }

    const newClient = new Client({
        brokerURL: `${import.meta.env.VITE_API_BASE_URL}/ws`,
        connectHeaders: {
            Authorization: `Bearer ${token}`
        },
        debug: (msg) => console.log(msg)
    });

    newClient.activate();

    newClient.onConnect = () => {

        newClient.subscribe("/user/queue/message", async (message) => {
            const newMessage: Message = JSON.parse(message.body);
            const data = queryClient.getQueryData<Conversation[]>(["/api/conversation"]);
            const conversation = data?.find(c => c.id === newMessage.conversationId);

            if (!conversation) {
                queryClient.refetchQueries({ queryKey: ["/api/conversation"] });
                return;
            }

            const isOnConversationRoute = window.location.pathname.startsWith("/dashboard/conversation");

            if (!isOnConversationRoute && newMessage.senderId !== auth?.userId) {
                toast("New message received");
            }

            queryClient.setQueryData<Conversation[]>(["/api/conversation"], (oldData) => {
                if (!oldData) return oldData;

                const updated = oldData.map(conv =>
                    conv.id === newMessage.conversationId
                        ? {
                            ...conv,
                            createdAt: new Date().toISOString(),
                            hasNewMessage: newMessage.senderId !== auth?.userId
                        }
                        : conv
                );

                return updated.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            });

            queryClient.setQueryData<InfiniteData<Slice<Message>>>(["/api/conversation/message", conversation.id], (oldData) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page, index) => {
                        if (page.first || index === 0) {
                            return {
                                ...page,
                                content: [newMessage, ...page.content]
                            };
                        }
                        return page;
                    })
                };
            });
        });
    }
    setClient(newClient);
}
