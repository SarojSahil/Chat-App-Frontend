import Chat from "@/shared/ui/Chat";
import Login from "@/shared/ui/Login";
import ProtectedRoute from "@/shared/ui/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                } />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;