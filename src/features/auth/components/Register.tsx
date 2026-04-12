import { useRegister } from "@/features/auth/lib";
import type { RegisterRequest } from "@/schema";
import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";

export const Register = () => {

    const { mutate: register } = useRegister();

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        const request: RegisterRequest = {
            name: formData.get("name") as string,
            phoneNumber: formData.get("phone-number") as string,
            password: formData.get("password") as string
        }
        register(request);
    }

    return (
        <div className="w-screen h-screen grid place-items-center bg-gray-200 p-4">
            <form onSubmit={handleSubmit} className="shadow-md p-8 bg-white w-full max-w-sm rounded-md">
                <h1 className="text-center mx-auto mb-4 text-3xl font-medium text-neutral-800">Register</h1>

                <label htmlFor="name" className="block font-medium text-neutral-600">Name : </label>
                <input type="text" name="name" id="name" className="p-2 border border-gray-400 rounded-md my-2 w-full" /><br />

                <label htmlFor="phone-number" className="block font-medium text-neutral-600">Phone Number : </label>
                <input type="text" name="phone-number" id="phone-number" className="p-2 border border-gray-400 rounded-md my-2 w-full" /><br />

                <label htmlFor="password" className="block font-medium text-neutral-600">Password : </label>
                <input type="password" name="password" id="password" className="p-2 border border-gray-400 rounded-md my-2 w-full" /><br />

                <button type="submit" className="my-4 w-full py-2 rounded-md bg-blue-500 text-white" >Register</button>
                <p className="text-sm">Already Regsistered? <Link to={"/login"} className="text-sky-600">Login</Link></p>
            </form>
        </div>
    );
}