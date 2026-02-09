import type { User } from "@/entity/User";
import { createContext, useContext, useState, type FC, type PropsWithChildren } from "react";

type AuthContext = {
    user: User | null;
    setUser: (user: User) => void;
}

const context = createContext<AuthContext>({ user: null, setUser: () => {} });

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    return (
        <context.Provider value={{ user, setUser }}>
            {children}
        </context.Provider>
    );
}

export const useAuth = () => {
    return useContext(context);
}