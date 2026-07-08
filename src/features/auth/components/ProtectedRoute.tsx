import { useAuthStore } from "@/app/store/AuthStore";
import { useInitializeStomp } from "@/lib";
// import { useInitializeStomp, useInitializeZego } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, type FC, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
    const auth = useAuthStore(state => state.auth);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useInitializeStomp({ token: auth?.token || "", queryClient });

    // useInitializeZego({
    //     appID: ,
    //     serverSecret: ,
    //     auth
    // });

    useEffect(() => {
        if (!auth?.token) {
            navigate("/login");
        }
    }, [auth]);

    return children;
};