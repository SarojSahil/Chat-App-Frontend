import type { ContactSaveRequest, TContact } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib";

export const useCreateContact = () => {

    const queryClient = useQueryClient();

    return useMutation<TContact, Error, ContactSaveRequest>({
        mutationFn: async (variable) => {
            return httpClient({ uri: "/api/contact", method: "POST", body: variable });
        },
        onSuccess: (data) => {
            queryClient.setQueryData<TContact[]>(["/api/contact"], (oldData) => {
                if (!oldData) return [];

                return [data, ...oldData];
            });
        }
    });
};