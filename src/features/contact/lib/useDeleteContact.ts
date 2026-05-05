import { httpClient, HttpError } from "@/lib";
import type { ContactDeleteRequest, Contact } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteContact = () => {

    const queryClient = useQueryClient();

    return useMutation<void, HttpError, ContactDeleteRequest>({
        mutationFn: async (variable) => httpClient({ uri: "/api/contact", method: "DELETE", body: variable }),
        onSuccess: (_, variable) => {
            queryClient.setQueryData<Contact[]>(["/api/contact"], (oldData) => {
                if (!oldData) return [];

                return oldData.filter(contact => contact.id !== variable.contactId);
            });
            toast.success("Contact deleted successfully.");
        },
        onError: (err) => {
            if (err.status === 404) {
                toast.error("Contact not found.");
            }
        }
    });
};