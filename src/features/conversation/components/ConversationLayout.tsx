import { Outlet, useMatch } from "react-router-dom";
import { ConversationHeader, ConversationList, EmptyConversationList } from "@/features/conversation/components";
import { useGetConversations } from "@/features/conversation/lib";
import { Loader } from "@/components/common";

export const ConversationLayout = () => {

    const { data: conversations, isFetching } = useGetConversations();
    const match = useMatch("/dashboard/conversation");

    const ConversationListComp = () => {
        if (isFetching)
            return <Loader />
        else if (conversations && conversations.length !== 0) 
            return <ConversationList conversations={conversations} />
        else
            return <EmptyConversationList />
    }

    return (
        <>
            <div className={`relative h-full overflow-y-auto flex-1 ${match ? "block" : "hidden"} lg:block border-r border-gray-200`}>
                <ConversationHeader />
                <ConversationListComp />
            </div>
            <Outlet />
        </>
    );
}