import type { SyntheticEvent } from "react";
import { useLogin } from "@/features/auth/lib";
import type { LoginRequest } from "@/schema";
import { Link } from "react-router-dom";

export const Login = () => {

    const { mutate: login } = useLogin();

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        const request: LoginRequest = {
            phoneNumber: formData.get("phoneNumber") as string,
            password: formData.get("password") as string
        }
        login(request);
    }

    return (
        <div className="w-screen h-screen grid place-items-center bg-gray-200 p-4">
            <form onSubmit={handleSubmit} className="shadow-md p-8 bg-white w-full max-w-sm rounded-md">
                <h1 className="text-center mx-auto mb-4 text-3xl font-medium text-neutral-800">Login</h1>

                <label htmlFor="phoneNumber" className="block font-medium text-neutral-600">Phone Number : </label>
                <input type="text" name="phoneNumber" id="phoneNumber" className="p-2 border border-gray-400 rounded-md my-2 w-full" /><br />

                <label htmlFor="password" className="block font-medium text-neutral-600">Password : </label>
                <input type="password" name="password" id="password" className="p-2 border border-gray-400 rounded-md my-2 w-full" /><br />

                <button type="submit" className="my-4 w-full py-2 rounded-md bg-blue-500 text-white" >Login</button>
                <p className="text-sm">New User? <Link to={"/register"} className="text-sky-600">Register</Link></p>
            </form>
        </div>
    );
}