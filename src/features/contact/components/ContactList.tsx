import type { Contact } from "@/schema";
import { Trash2, User2 } from "lucide-react";
import { useEffect, useState, type FC, type SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { ConsentModal } from "@/components/common";
import { useDeleteContact } from "@/features/contact/lib";

type ContactListProps = {
    contacts: Contact[]
}

export const ContactList: FC<ContactListProps> = ({ contacts }) => {

    const [isVisible, setVisible] = useState<boolean>(false);
    const [contactId, setContactId] = useState<number>(-1);

    const { mutate: deleteContact, isSuccess, reset } = useDeleteContact();

    const handleCancel = () => {
        setContactId(-1);
        setVisible(false);
    }

    const handleOpenConsent = (e: SyntheticEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        setContactId(id);
        setVisible(true);
    }

    const handleDelete = () => {
        deleteContact({ contactId })
    }

    useEffect(() => {
        setVisible(false);
        reset();
    }, [isSuccess]);

    return (
        <>
            <div className="w-full bg-white">

                {contacts.map((contact) => (
                    <NavLink
                        key={contact.id}
                        to={`/dashboard/contact/${contact.id}`}
                        className="flex items-center gap-4 px-4 py-4 border-b border-zinc-200 hover:bg-blue-100 active:bg-zinc-100 transition"
                    >

                        {
                            contact.user.profilePictureUrl
                                ?
                                <img
                                    src={contact.user.profilePictureUrl}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                :
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white">
                                    <User2 size={24} />
                                </div>
                        }

                        <div className="flex-1 min-w-0">
                            <p className="text-lg font-semibold text-zinc-900 truncate">
                                {contact.name}
                            </p>
                        </div>

                        <button
                            onClick={(e) => handleOpenConsent(e, contact.id)}
                            className="p-2.5 rounded-lg hover:bg-red-600 active:scale-95 bg-red-500 transition text-white"
                        >
                            <Trash2 size={24} className="" />
                        </button>

                    </NavLink>
                ))}

            </div>

            <ConsentModal
                open={isVisible}
                handleCancel={handleCancel}
                handleAction={handleDelete}
                action="Delete"
                message="Are you sure want to delete this contact?"
                title="Delete Contact?"
            />
        </>
    );
};