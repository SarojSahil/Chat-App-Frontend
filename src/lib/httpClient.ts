import { useAuthStore } from "@/app/store/AuthStore";

type RestClientParams = {
    uri: string,
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: any,
};

export class HttpError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export const httpClient = async ({ uri, method = "GET", body }: RestClientParams) => {

    const token = useAuthStore.getState().auth?.token;

    const isFormData = body instanceof FormData;

    const res = await fetch(uri, {
        method,
        headers: {
            ...(!isFormData && { "Content-Type": "application/json" }),
            ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: body
            ? isFormData
                ? body
                : JSON.stringify(body)
            : undefined
    });

    if (!res.ok) {
        if (res.status === 401) {
            useAuthStore.getState().clearAuth();
            useAuthStore.persist.clearStorage();
        }
        throw new HttpError(res.status, "Request Failed.");
    }

    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return res.json();
    }

    return;
};