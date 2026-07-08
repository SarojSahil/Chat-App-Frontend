import { Outlet, useMatch } from "react-router-dom";
import { useGetContact } from "@/features/contact/lib";
import { ContactHeader, ContactList, EmptyContactList } from "@/features/contact/components";
import { Loader } from "@/components/common";

export const ContactLayout = () => {

    const { isFetching, data: contacts } = useGetContact();
    const match = useMatch("/dashboard/contact");

    const ContactListComp = () => {
        if (isFetching)
            return <Loader />
        else if (contacts && contacts.length !== 0)
            return <ContactList contacts={contacts} />
        else
            return <EmptyContactList />
    }

    return (
        <>
            <div tabIndex={0} className={`relative h-full overflow-y-auto flex-1 ${match ? "block" : "hidden"} lg:block`}>
                <ContactHeader />
                <ContactListComp />
            </div>
            <Outlet />
        </>
    );
}