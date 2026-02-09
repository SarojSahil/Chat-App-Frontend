import { useAuth } from "@/app/context/authContext/AuthContext";
import type { User } from "@/entity/User";
import { useMutation } from "@tanstack/react-query";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { setUser } = useAuth();
    const navigate = useNavigate();
    const { mutate } = useMutation<User, Error, Pick<User, "name">>({
        mutationKey: ['auth'],
        mutationFn: async (user) => {
            const res = await fetch(`http://${window.location.host}/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name: user.name, id: 0 })
            });
            if (!res.ok) {
                throw new Error("Unable to login.");
            }
            const data = await res.json();
            return data;
        },
        onSuccess: (data) => {
            setUser(data);
            navigate("/")
        }
    });

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        mutate({ name });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" className="border rounded mb-4"/><br />
            <button type="submit" className="min-w-32 block mx-auto py-1 rounded bg-blue-500 text-white" >Login</button>
        </form>
    );
}

export default Login;