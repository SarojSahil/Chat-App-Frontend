import { Edit } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useGetContact, useUpdateContact } from "@/features/contact/lib";

export const ContactView = () => {
    const firstInputRef = useRef<HTMLInputElement>(null);

    const { id } = useParams();
    const contactId = Number(id);

    const { data } = useGetContact();
    const contact = data?.find(d => d.id === contactId);

    const [editing, setEditing] = useState(false);
    const [contactName, setContactName] = useState("");

    const { mutate: updateContact, isPending } = useUpdateContact();

    useEffect(() => {
        if (contact) {
            setContactName(contact.name);
        }
    }, [contact]);

    useEffect(() => {
        if (editing) {
            firstInputRef.current?.focus();
        }
    }, [editing]);

    const handleCancel = () => {
        if (contact) {
            setContactName(contact.name);
        }
        setEditing(false);
    };

    const handleSave = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateContact({ name: contactName, id: contactId });
        setEditing(false);
    };

    return contact ? (
        <div className="flex-1 border-l border-l-gray-200 flex flex-col bg-gray-200">
            <div className="p-4 border-b border-b-gray-200 flex justify-between items-center rounded-t-md mx-4 mt-4 bg-white">
                <h3 className="text-2xl font-semibold">Contact Details :</h3>
                <button
                    onClick={() => setEditing(true)}
                    className={`hover:bg-green-600 cursor-pointer flex gap-2 bg-green-500 text-white p-2 rounded-md ${editing && "invisible"}`}
                >
                    <Edit />
                    <span>Edit Contact</span>
                </button>
            </div>

            <div className="overflow-auto bg-white mx-4 mb-4 rounded-b-md">
                <img
                    src="/images.jpg"
                    className="object-cover w-40 h-40 mx-auto border border-gray-200 shadow-xl rounded-full my-4"
                />

                <h3 className="text-center text-3xl mb-4">{contact.name}</h3>

                <form className="max-w-sm mx-auto p-4" onSubmit={handleSave}>
                    <p className="mb-4 text-lg">Contact Details :</p>

                    <div className="flex mb-4">
                        <label className="w-20" htmlFor="contactName">Name :</label>
                        <input
                            ref={firstInputRef}
                            id="contactName"
                            type="text"
                            className="grow border border-gray-300 rounded-md px-2 py-1"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            disabled={!editing}
                        />
                    </div>

                    <div className="flex mb-4">
                        <p className="w-20">Phone :</p>
                        <p className="grow border border-gray-300 rounded-md bg-gray-100 px-2 py-1">
                            {contact.phoneNumber}
                        </p>
                    </div>

                    {
                        (editing || isPending)
                        && (
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-500 p-2 cursor-pointer text-white rounded-md grow hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 p-2 cursor-pointer text-white rounded-md grow hover:bg-green-600"
                                >
                                    {isPending ? "Updating..." : "Save"}
                                </button>
                            </div>
                        )}
                </form>
            </div>
        </div>
    ) : (
        <Navigate to="/contacts" />
    );
};