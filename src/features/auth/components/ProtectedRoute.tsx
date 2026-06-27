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
    //     appID: 1162961740,
    //     serverSecret: "b7301a5ad5f7c173eb3fbabdc330fcd9",
    //     auth
    // });

    useEffect(() => {
        if (!auth?.token) {
            navigate("/login");
        }
    }, [auth]);

    return children;
};