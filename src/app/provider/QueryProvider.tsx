import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { FC, PropsWithChildren } from "react";

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools client={client} />
        </QueryClientProvider>
    );
}

export default QueryProvider;