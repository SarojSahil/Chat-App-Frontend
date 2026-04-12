import type { AuthResponse } from "@/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
    auth: AuthResponse | null;
    setAuth: (auth: AuthResponse) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            auth: null,

            setAuth: (auth) => set({ auth }),

            clearAuth: () => set({ auth: null })
        }),
        {
            name: "auth",
            partialize: (state) => ({auth: state.auth})
        }
    )
);