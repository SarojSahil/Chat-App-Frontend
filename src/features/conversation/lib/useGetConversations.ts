import { httpClient } from "@/lib";
import type { Conversation } from "@/schema/Conversation";
import { useQuery } from "@tanstack/react-query"

export const useGetConversations = () => {
    return useQuery<Conversation[]>({
        queryKey: ["/api/conversation"],
        queryFn: async () => httpClient({ uri: "/api/conversation" })
    });
}