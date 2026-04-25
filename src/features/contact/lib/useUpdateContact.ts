import { httpClient } from "@/lib";
import type { ContactUpdateRequest, Contact } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateContact = () => {

    const queryClient = useQueryClient();

    return useMutation<Contact, Error, ContactUpdateRequest>({
        mutationFn: async (variable) => httpClient({ uri: "/api/contact", method: "PUT", body: variable }),
        onSuccess: (data) => {
            queryClient.setQueryData<Contact[]>(["/api/contact"], (oldData) => {
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