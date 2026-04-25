import { useAuthStore } from "@/app/store/AuthStore";
import { useStompClientStore } from "@/app/store/StompClientStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, type FC, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {

    const auth = useAuthStore(state => state.auth);
    const { client, connect } = useStompClientStore(state => state);
    const queryClient = useQueryClient();

    useEffect(() => {

        if (auth && auth.token && !client) {
            connect(auth.token, queryClient);
        }

    }, [auth, client]);

    if (auth && auth.token) {
        return children;
    } else {
        return <Navigate to={"/login"} replace={true} />
    }
}