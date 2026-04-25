import type { AuthResponse, LoginRequest } from "@/schema";
import { useMutation } from "@tanstack/react-query"
import { httpClient } from "@/lib/httpClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/AuthStore";

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation<AuthResponse, Error, LoginRequest>({
        mutationFn: async (variable) => {
            return httpClient({ uri: "/api/auth/login", method: "POST", body: variable });
        },
        onSuccess: (data) => {
            useAuthStore.getState().setAuth(data);
            navigate("/dashboard/contact");
        }
    });
};