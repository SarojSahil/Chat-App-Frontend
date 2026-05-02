import { useRef } from "react";
import type { AuthResponse } from "@/schema";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";

let zpInstance: ZegoUIKitPrebuilt | null = null;

type Props = {
    appID: number;
    serverSecret: string;
    auth: AuthResponse | null;
};

export const useInitializeZego = ({ appID, serverSecret, auth }: Props) => {
    const initialized = useRef(false);

    if (!auth || initialized.current) return zpInstance;

    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        auth.userId.toString(),
        auth.userId.toString(),
        auth.name
    );

    zpInstance = ZegoUIKitPrebuilt.create(token);
    zpInstance.addPlugins({ ZIM });

    initialized.current = true;

    return zpInstance;
};

export const getZego = () => zpInstance;