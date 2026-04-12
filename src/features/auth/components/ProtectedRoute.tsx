import { useAuthStore } from "@/app/store/AuthStore";
import type { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {

    const auth = useAuthStore(state => state.auth);

    if (auth?.token) {
        return children;
    }

    return <Navigate to={"/login"} />
}