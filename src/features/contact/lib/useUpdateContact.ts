import { httpClient } from "@/lib";
import type { ContactUpdateRequest, TContact } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateContact = () => {

    const queryClient = useQueryClient();

    return useMutation<TContact, Error, ContactUpdateRequest>({
        mutationFn: async (variable) => {
            return httpClient({ uri: "/api/contact", method: "PUT", body: variable });
        },
        onSuccess: (data) => {
            queryClient.setQueryData<TContact[]>(["/api/contact"], (oldData) => {
                if (!oldData) return [];

                return oldData.map(contact =>
                    contact.id === data.id
                        ? data
                        : contact
                );
            });
        }
    });
};