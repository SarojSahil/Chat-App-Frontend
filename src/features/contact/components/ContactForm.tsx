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
            contactName: formData.get("contactName") as string,
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
        <div className="flex-1 bg-zinc-50 py-4 border-l overflow-y-auto border-l-zinc-200">

            <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-zinc-200 shadow-md p-6">

                <h2 className="text-xl font-semibold text-zinc-900">
                    Add New Contact
                </h2>
                <p className="text-sm text-zinc-500 mb-6">
                    Add someone to your network
                </p>

                <div className="flex justify-center mb-6">
                    <div className="w-34 h-34 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                        <User size={40} className="text-zinc-500" />
                    </div>
                </div>

                <form className="space-y-5" onSubmit={handleAddContact}>

                    <div>
                        <label className="block text-base! font-medium text-zinc-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="contactName"
                            id="contactName"
                            className="text-lg w-full px-5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-base! font-medium text-zinc-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="text-lg w-full px-5 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2 outline-none transition"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/contact")}
                            className="flex-1 py-2.5 rounded-lg border active:scale-95 border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition font-medium"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-lg active:scale-95 bg-blue-600 text-white hover:bg-blue-700 transition font-semibold shadow-md"
                        >
                            {isPending ? "Saving..." : "Save"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}