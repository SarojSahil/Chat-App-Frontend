import { DashboardLayout, Homepage } from "@/components/layout";
import { Login, ProtectedRoute, Register } from "@/features/auth/components";
import { ContactForm, ContactLayout, ContactView, EmptyContactView } from "@/features/contact/components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route path="contacts" element={<ContactLayout />} >
                        <Route index element={<EmptyContactView />} />
                        <Route path="add" element={<ContactForm />} />
                        <Route path="view/:id" element={<ContactView />} />
                    </Route>
                    <Route path="conversations" element={"Conversations"} />
                </Route>
            </Routes>
        </BrowserRouter >
    );
}

export default AppRouter;