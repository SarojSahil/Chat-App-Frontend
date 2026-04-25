import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateContact } from "@/features/contact/lib";
import { useEffect, type SyntheticEvent } from "react";
import type { ContactSaveRequest } from "@/schema";

export const ContactForm = () => {

    const navigate = useNavigate();
    const { mutate: createContact, isPending, isSuccess, reset } = useCreateContact();

    const handleAddContact = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newContact: ContactSaveRequest = {
            name: formData.get("contactName") as string,
            phoneNumber: formData.get("phone") as string
        }
        createContact(newContact);
    }

    useEffect(() => {
        if (isSuccess) {
            reset();
            navigate("/dashboard/contact");
        }
    }, [isSuccess]);

    return (
        <div className="bg-gray-200 flex-1">
            <div className="bg-white rounded-md shodow-lg p-6 m-4">
                <h2 className="text-xl font-semibold">Add New Contact</h2>
                <p className="text-neutral-600">Add someone to your network</p>
                <User className="w-30 h-30 sm:w-40 sm:h-40 border border-gray-300 rounded-full p-2 mx-auto my-6" />
                <form className="max-w-sm mx-auto" onSubmit={handleAddContact}>
                    <div className="mb-4">
                        <label className="block mb-1" htmlFor="contactName">Name: </label>
                        <input className="border border-gray-300 rounded-md p-1.5 block w-full" type="text" name="contactName" id="contactName" />
                    </div>
                    <div className="mb-8">
                        <label className="block mb-1" htmlFor="phone">Phone: </label>
                        <input className="border border-gray-300 rounded-md p-1.5 block w-full" type="text" name="phone" id="phone" />
                    </div>
                    <div className="flex gap-4">
                        <button type="button" onClick={() => navigate("/dashboard/contact")} className="flex-1 py-1 border rounded hover:bg-gray-200">
                            Cancel
                        </button>

                        <button type="submit" className="flex-1 py-1 bg-red-600 text-white rounded hover:bg-red-800">
                            {isPending ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}