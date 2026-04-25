import { httpClient } from "@/lib";
import type { ContactDeleteRequest, Contact } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteContact = () => {

    const queryClient = useQueryClient();

    return useMutation<void, Error, ContactDeleteRequest>({
        mutationFn: async (variable) => httpClient({ uri: "/api/contact", method: "DELETE", body: variable }),
        onSuccess: (_, variable) => {
            queryClient.setQueryData<Contact[]>(["/api/contact"], (oldData) => {
                if (!oldData) return [];

                return oldData.filter(contact => contact.id !== variable.id);
            });
        }
    });
};