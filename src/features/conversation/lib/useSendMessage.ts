import { httpClient } from "@/lib";
import type { Conversation, MessageSendRequest } from "@/schema/Conversation";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation<Conversation, Error, MessageSendRequest>({
        mutationFn: async (variable) => httpClient({ uri: "/api/conversation/message", method: "POST", body: variable }),
        onSuccess: (data) => {
            queryClient.setQueryData<Conversation[]>(["/api/conversation"], (oldData) => {
                if (oldData && data) {
                    return [data, ...oldData.filter(data => !data.isVirtual)];
                }
                else if (oldData) {
                    return oldData;
                }
                return [];
            });
        }
    });
}