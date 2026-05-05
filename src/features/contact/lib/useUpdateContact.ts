import { httpClient, HttpError } from "@/lib";
import type { ContactUpdateRequest, Contact } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateContact = () => {

    const queryClient = useQueryClient();

    return useMutation<Contact, HttpError, ContactUpdateRequest>({
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
            toast.success("Contact updated succesfully.");
        },
        onError: (err) => {
            if (err.status === 404) {
                toast.error("Contact not found.");
            }
        }
    });
};