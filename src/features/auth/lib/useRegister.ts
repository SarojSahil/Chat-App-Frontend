import type { AuthResponse } from "@/schema";
import { useMutation } from "@tanstack/react-query"
import { httpClient, HttpError } from "@/lib/httpClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/app/store/AuthStore";
import { toast } from "react-toastify";

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation<AuthResponse, HttpError, FormData>({
        mutationFn: async (variable) => {
            return httpClient({ uri: "/api/auth/register", method: "POST", body: variable });
        },
        onSuccess: (data) => {
            useAuthStore.getState().setAuth(data);
            toast.success("Account Created Successfully!");
            navigate("/dashboard/contact");
        },
        onError: (err) => {
            if (err.status === 409) {
                toast.error("Phone number already exists.");
            } else {
                toast.error("Invalid phone number or password.");
            }
        }
    });
};