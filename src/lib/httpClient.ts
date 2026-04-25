import { useAuthStore } from "@/app/store/AuthStore";

type RestClientParams = {
    uri: string,
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: any,
};

export const httpClient = async ({ uri, method = "GET", body }: RestClientParams) => {

    const token = useAuthStore.getState().auth?.token;

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${uri}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: body ? JSON.stringify(body) : undefined
    });

    if (!res.ok) {
        if (res.status === 401) {
            useAuthStore().clearAuth();
            useAuthStore.persist.clearStorage();
        }
        throw new Error("Request failed");
    }

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return res.json();
    }

    return;
};