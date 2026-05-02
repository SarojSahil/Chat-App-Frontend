import { Edit, MessageCircle } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { useGetContact, useUpdateContact } from "@/features/contact/lib";
import { useGetConversations } from "@/features/conversation/lib";
import type { Conversation } from "@/schema/Conversation";
import { useQueryClient } from "@tanstack/react-query";

export const ContactView = () => {
    const firstInputRef = useRef<HTMLInputElement>(null);

    const { id } = useParams();
    const contactId = Number(id);

    const { data: contacts } = useGetContact();
    const contact = contacts?.find(c => c.id === contactId);

    const { data: conversations } = useGetConversations();
    const conversation = conversations?.find(c => c.otherPerson.id === contact?.user.id);

    const queryClient = useQueryClient();

    const [editing, setEditing] = useState(false);
    const [contactName, setContactName] = useState<string>("");

    const { mutate: updateContact, isPending } = useUpdateContact();

    const navigate = useNavigate();

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
            setContactName(contact.name)
        }
        setEditing(false);
    };

    const handleSave = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateContact({ contactName, contactId });
        setEditing(false);
    };

    const handleOpenConversation = () => {
        if (conversation) {
            navigate(`/dashboard/conversation/${conversation.id}`);
        }
        else if (contact) {
            const virtualConversation: Conversation = {
                id: -1,
                otherPerson: {
                    id: contact.user.id,
                    name: contact.user.name,
                    phoneNumber: contact.user.phoneNumber
                },
                isVirtual: true
            }
            queryClient.setQueryData<Conversation[]>(["/api/conversation"], (oldData) => {
                if (oldData) {
                    return [virtualConversation, ...oldData];
                }
                return [];
            });
            navigate(`/dashboard/conversation/${virtualConversation.id}`);
        }
    }

    return contact ? (
        <div className="flex-1 flex flex-col border-l border-l-gray-200">
            <div className="h-20 shrink-0 px-4 border-b border-b-gray-200 flex justify-between items-center">
                <h3 className="text-2xl font-semibold">Contact Details :</h3>
                <button
                    onClick={() => setEditing(true)}
                    className={`hover:bg-green-600 cursor-pointer flex gap-2 bg-green-500 text-white p-2 rounded-md ${editing && "invisible"}`}
                >
                    <Edit />
                    <span>Edit Contact</span>
                </button>
            </div>

            <div className="overflow-auto bg-white">
                <img
                    src="/images.jpg"
                    className="object-cover w-40 h-40 mx-auto border border-gray-200 shadow-xl rounded-full my-4"
                />

                <p className="text-center text-neutral-600">~ {contact.user.name}</p>
                <h3 className="text-center text-3xl mb-4">{contact.name}</h3>

                <div className="text-center">
                    <button onClick={handleOpenConversation} className="inline-flex gap-2 items-center bg-green-500 text-white p-2 rounded-md">
                        <MessageCircle />
                        <span>Send Message</span>
                    </button>
                </div>

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
                            {contact.user.phoneNumber}
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
        <Navigate to="/dashboard/contact" />
    );
};