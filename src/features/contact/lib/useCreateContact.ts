import type { ContactSaveRequest, Contact } from "@/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/lib";

export const useCreateContact = () => {

    const queryClient = useQueryClient();

    return useMutation<Contact, Error, ContactSaveRequest>({
        mutationFn: async (variable) => httpClient({ uri: "/api/contact", method: "POST", body: variable }),
        onSuccess: (data) => {
            queryClient.setQueryData<Contact[]>(["/api/contact"], (oldData) => {
                if (!oldData) return [];

                return [data, ...oldData];
            });
        }
    });
};