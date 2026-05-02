import { useStompClientStore } from "@/app/store/StompClientStore";
import type { Conversation, Message, Slice } from "@/schema/Conversation";
import { Client } from "@stomp/stompjs";
import type { InfiniteData, QueryClient } from "@tanstack/react-query";

type StompClientProps = {
    token: string,
    queryClient: QueryClient
}

export const useInitializeStomp = ({ queryClient, token }: StompClientProps) => {

    const { client, setClient } = useStompClientStore();

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

        // Message subscription
        newClient.subscribe("/user/queue/message", (message) => {
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
                    })
                };
            });
        });
    }
    setClient(newClient);
}
