import type { AuthResponse, RegisterRequest } from "@/schema";
import { useMutation } from "@tanstack/react-query"
import { httpClient } from "@/lib/httpClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/AuthStore";

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation<AuthResponse, Error, RegisterRequest>({
        mutationFn: async (variable) => {
            return httpClient({ uri: "/api/auth/register", method: "POST", body: variable });
        },
        onSuccess: (data) => {
            useAuthStore.getState().setAuth(data);
            navigate("/dashboard/contacts");
        }
    });
};