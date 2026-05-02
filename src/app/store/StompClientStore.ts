import { Client } from "@stomp/stompjs";
import { create } from "zustand";

type StompClientStore = {
    client?: Client,
    setClient: (client: Client) => void
}

export const useStompClientStore = create<StompClientStore>((set) => {
    return {
        client: undefined,
        setClient(client) {
            set({ client });
        },
    }
});