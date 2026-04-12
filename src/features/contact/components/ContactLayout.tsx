import { Outlet, useMatch } from "react-router-dom";
import { useGetContact } from "@/features/contact/lib";
import { ContactHeader, ContactList, EmptyContactList } from "@/features/contact/components";
import { Loader } from "@/components/common";

export const ContactLayout = () => {

    const { isFetching, data: contacts } = useGetContact();
    const match = useMatch("/dashboard/contacts");

    return (
        <>
            <section className={`flex-1 ${match ? "block" : "hidden"} lg:block`}>
                <ContactHeader />

                {isFetching && <Loader />}

                {contacts?.length === 0 && <EmptyContactList />}

                <ContactList contacts={contacts} />
            </section>
            <Outlet />
        </>
    );
}