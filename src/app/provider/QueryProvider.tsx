import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: Infinity,
            gcTime: Infinity
        },
        mutations: {
            retry: false
        }
    }
});

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    );
}

export default QueryProvider;