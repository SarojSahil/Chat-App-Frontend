import { httpClient } from "@/lib";
import type { GeneratedMessage, } from "@/schema/Conversation";
import { useMutation, } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const useGenerateMessage = () => {

    return useMutation<GeneratedMessage, Error, GeneratedMessage>({
        mutationFn: async (variable) => httpClient({ uri: "/api/ai/generate", method: "POST", body: variable }),
        onError: () => {
            toast.error("Failed generating message.");
        }
    });
}