import type { Conversation, Message, Slice } from "@/schema/Conversation";
import { Client } from "@stomp/stompjs";
import { QueryClient, type InfiniteData } from "@tanstack/react-query";
import { create } from "zustand";

type StompClientStore = {
    client?: Client,
    connect: (token: string, queryClient: QueryClient) => void
}

export const useStompClientStore = create<StompClientStore>((set, get) => ({
    client: undefined,
    connect: (token, queryClient) => {
        const currentClient = get().client;

        if (currentClient?.active || currentClient?.connected) {
            return;
        }

        const client = new Client({
            brokerURL: `${import.meta.env.VITE_API_BASE_URL}/ws`,
            connectHeaders: {
                Authorization: `Bearer ${token}`
            },
            debug: (msg) => console.log(msg)
        });

        client.activate();

        client.onConnect = () => {
            client.subscribe("/user/queue/message", (message) => {
                const newMessage: Message = JSON.parse(message.body);
                const data = queryClient.getQueryData<Conversation[]>(["/api/conversation"]);
                const conversation = data?.find(c => c.id === newMessage.conversationId);
                if (!conversation) {
                    queryClient.refetchQueries({ queryKey: ["/api/conversation"] });
                    return;
                }
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
                        }),
                    };
                }
                );
            });
        };

        set({ client });
    }
}));