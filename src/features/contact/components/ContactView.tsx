import { Edit, MessageCircle, User2 } from "lucide-react";
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
        if (contact) setContactName(contact.name);
    }, [contact]);

    useEffect(() => {
        if (editing) firstInputRef.current?.focus();
    }, [editing]);

    const handleCancel = () => {
        if (contact) setContactName(contact.name);
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
        } else if (contact) {
            const virtualConversation: Conversation = {
                id: -1,
                otherPerson: {
                    id: contact.user.id,
                    name: contact.user.name,
                    phoneNumber: contact.user.phoneNumber,
                    profilePictureUrl: contact.user.profilePictureUrl,
                },
                isVirtual: true,
                createdAt: new Date().toISOString()
            };

            queryClient.setQueryData<Conversation[]>(["/api/conversation"], (oldData) => {
                return oldData ? [virtualConversation, ...oldData] : [];
            });

            navigate(`/dashboard/conversation/${virtualConversation.id}`);
        }
    };

    return contact ? (
        <div className="flex-1 flex flex-col border-l border-zinc-200 bg-zinc-50 py-4 overflow-y-auto">
            <div className="w-full max-w-md bg-white rounded-2xl border border-zinc-200 shadow-md p-6 mx-auto">

                <div className="flex items-center justify-between">

                    <h3 className="text-xl font-semibold text-zinc-900">
                        Contact Details
                    </h3>

                    {!editing && (
                        <button
                            onClick={() => setEditing(true)}
                            className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition active:scale-95"
                        >
                            <Edit size={24} />
                            Edit
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-auto">

                    <div className="bg-white border-b border-zinc-200 py-6 flex flex-col items-center">

                        {
                            contact.user.profilePictureUrl
                                ?
                                <img
                                    src={contact.user.profilePictureUrl}
                                    className="w-34 h-34 rounded-full object-cover border border-zinc-200"
                                />
                                :
                                <div className="w-34 h-34 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                                    <User2 size={40} className="text-zinc-500" />
                                </div>
                        }

                        <h3 className="mt-4 text-xl font-semibold text-zinc-900">
                            {contact.name}
                        </h3>

                        <p className="text-sm text-zinc-500">
                            ~ {contact.user.name}
                        </p>

                        <button
                            onClick={handleOpenConversation}
                            className="mt-4 flex items-center gap-2 p-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition active:scale-95"
                        >
                            <MessageCircle size={24} />
                            Message
                        </button>
                    </div>

                    <form className="max-w-md mx-auto p-5 space-y-5" onSubmit={handleSave}>

                        <h4 className="text-lg font-semibold text-zinc-900">
                            Details
                        </h4>

                        <div>
                            <label className="block text-base! font-medium text-zinc-600 mb-1">
                                Name
                            </label>
                            <input
                                ref={firstInputRef}
                                type="text"
                                className="text-lg font-normal w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:ring-2  outline-none transition"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                disabled={!editing}
                            />
                        </div>

                        <div>
                            <label className="block text-base! font-medium text-zinc-600 mb-1">
                                Phone
                            </label>
                            <div className="text-lg font-normal w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-700">
                                {contact.user.phoneNumber}
                            </div>
                        </div>

                        {(editing || isPending) && (
                            <div className="flex gap-3 pt-2">

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="text-lg font-medium flex-1 py-2.5 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 transition active:scale-95"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="text-lg font-medium flex-1 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition active:scale-95"
                                >
                                    {isPending ? "Updating..." : "Save"}
                                </button>

                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/dashboard/contact" />
    );
};