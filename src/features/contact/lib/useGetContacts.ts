import { useQuery } from "@tanstack/react-query"
import type { Contact } from "@/schema";
import { httpClient } from "@/lib";

export const useGetContact = () => {

    return useQuery<Contact[]>({
        queryKey: ["/api/contact"],
        queryFn: async () => httpClient({ uri: "/api/contact" })
    });
};