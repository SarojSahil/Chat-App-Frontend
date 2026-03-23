import Chat from "@/shared/ui/Chat";
import Login from "@/shared/ui/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;