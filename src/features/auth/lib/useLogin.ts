import type { AuthResponse, LoginRequest } from "@/schema";
import { useMutation } from "@tanstack/react-query"
import { httpClient, HttpError } from "@/lib/httpClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/AuthStore";
import { toast } from "react-toastify";

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation<AuthResponse, HttpError, LoginRequest>({
        mutationFn: async (variable) => {
            return httpClient({ uri: "/api/auth/login", method: "POST", body: variable });
        },
        onSuccess: (data) => {
            useAuthStore.getState().setAuth(data);
            toast.success("Welcome Back!");
            navigate("/dashboard/contact");
        },
        onError: () => {
            toast.error("Invalid phone number or password.");
        }
    });
};