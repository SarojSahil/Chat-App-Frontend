import { httpClient } from "@/lib";
import type { Slice, Message } from "@/schema/Conversation";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetMessagesProps = {
    conversationId: number,
    enabled: boolean
}

export const useGetMessages = ({ conversationId, enabled }: GetMessagesProps) => {
    return useInfiniteQuery<Slice<Message>>({
        queryKey: ["/api/conversation/message", conversationId],
        queryFn: async ({ pageParam = 0 }) => {
            return httpClient({ uri: `/api/conversation/${conversationId}/message?page=${pageParam}&size=10` });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            return lastPage.last ? undefined : lastPage.number + 1;
        },
        enabled: enabled
    });
};