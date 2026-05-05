import type { ContactSaveRequest, Contact } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient, HttpError } from "@/lib";
import { toast } from "react-toastify";

export const useCreateContact = () => {

    const queryClient = useQueryClient();

    return useMutation<Contact, HttpError, ContactSaveRequest>({
        mutationFn: async (variable) => httpClient({ uri: "/api/contact", method: "POST", body: variable }),
        onSuccess: (data) => {
            queryClient.setQueryData<Contact[]>(["/api/contact"], (oldData) => {
                if (!oldData) return [];

                return [data, ...oldData];
            });
            toast.success("Contact added succesfully.");
        },
        onError: (err) => {
            if (err.status === 409) {
                toast.error("Contact already exists.");
            } else if (err.status === 404) {
                toast.error("User not found.");
            } else if (err.status === 400) {
                toast.error("Please enter valid contact details.");
            }
        }
    });
};