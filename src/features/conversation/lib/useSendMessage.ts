import { httpClient } from "@/lib";
import type { Conversation, MessageSendRequest } from "@/schema/Conversation";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const useSendMessage = () => {
    const queryClient = useQueryClient();

    return useMutation<Conversation, Error, MessageSendRequest>({
        mutationFn: async (variable) => httpClient({ uri: "/api/conversation/message", method: "POST", body: variable }),
        onSuccess: (data, variable) => {
            queryClient.setQueryData<Conversation[]>(["/api/conversation"], (oldData) => {
                if (oldData && data) {
                    const updated = [data, ...oldData.filter(data => !data.isVirtual)];
                    return updated.sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                }
                else if (oldData) {
                    return oldData.map(d =>
                        (d.id === variable.conversationId) ? { ...d, createdAt: new Date().toISOString() } : d
                    ).sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                }
                return [];
            });
        },
        onError: () => {
            toast.error("Error sending message.");
        }
    });
}