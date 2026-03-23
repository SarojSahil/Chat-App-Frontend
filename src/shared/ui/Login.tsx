import type { LoginRequest, LoginResponse, User } from "@/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const { mutate, data: loginData } = useMutation<LoginResponse, Error, LoginRequest>({
        mutationKey: ["auth/login"],
        mutationFn: async (request) => {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            });
            return await res.json();
        }
    });
    const token = loginData?.token;

    const { data: userData } = useQuery({
        queryKey: ["auth/me"],
        queryFn: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json() as User;
            return data;
        },
        enabled: !!token
    });

    if (userData?.id) {
        navigate("chat");
    }

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        const request: LoginRequest = {
            username: formData.get("username") as string,
            password: formData.get("password") as string
        }
        mutate(request);
    }

    return (
        <form onSubmit={handleSubmit} className="font-snpro">
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" className="border rounded mb-4" /><br />
            <label htmlFor="password">Password: </label>
            <input type="text" name="password" id="password" className="border rounded mb-4" /><br />
            <button type="submit" className="min-w-32 block mx-auto py-1 rounded bg-blue-500 text-white" >Login</button>
        </form>
    );
}

export default Login;