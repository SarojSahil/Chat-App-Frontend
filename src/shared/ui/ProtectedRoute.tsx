import { useAuth } from "@/app/context/authContext/AuthContext";
import type { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {

    const { user } = useAuth();
    const location = useLocation();

    if (user) {
        return children;
    }
    return <Navigate to={"/login"} replace state={{ from: location }} />;
}

export default ProtectedRoute;