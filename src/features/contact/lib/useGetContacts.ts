import { useQuery } from "@tanstack/react-query"
import type { TContact } from "@/schema";
import { httpClient } from "@/lib";

export const useGetContact = () => {

    return useQuery<TContact[]>({
        queryKey: ["/api/contact"],
        queryFn: async () => {
            return httpClient({ uri: "/api/contact" });
        }
    });
};