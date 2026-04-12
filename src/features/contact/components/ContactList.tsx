import type { TContact } from "@/schema";
import { Trash2, User } from "lucide-react";
import { useEffect, useState, type FC, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ConsentModal } from "@/components/common";
import { useDeleteContact } from "@/features/contact/lib";

type ContactListProps = {
    contacts?: TContact[]
}

export const ContactList: FC<ContactListProps> = ({ contacts }) => {

    const navigate = useNavigate();
    const [isVisible, setVisible] = useState<boolean>(false);
    const [id, setId] = useState<number>(-1);

    const { mutate: deleteContact, isSuccess, reset } = useDeleteContact();

    const handleCancel = () => {
        setId(-1);
        setVisible(false);
    }

    const handleOpenConsent = (e: SyntheticEvent, id: number) => {
        e.stopPropagation();
        setId(id);
        setVisible(true);
    }

    const handleDelete = () => {
        deleteContact({ id: id })
    }

    useEffect(() => {
        setVisible(false);
        reset();
    }, [isSuccess]);

    return (
        <>
            {
                contacts
                &&
                <ul className="p-4 space-y-2 w-full">
                    {contacts.map((contact) => (
                        <li key={contact.id}
                            onClick={() => navigate(`view/${contact.id}`)}
                            className="hover:bg-gray-50 cursor-pointer border border-gray-200 py-3 flex gap-2 items-center px-4 rounded-md shadow">
                            <User className="border rounded-full" />
                            <span className="flex-1">{contact.name}</span>
                            <Trash2 className="text-red-500" onClick={(e) => handleOpenConsent(e, contact.id)} />
                        </li>
                    ))}
                </ul>
            }
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
}