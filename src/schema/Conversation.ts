import type { ContactUser } from "@/schema/Contact"

export type Conversation = {
    id: number,
    otherPerson: ContactUser,
    isVirtual?: boolean;
}

export type MessageSendRequest = {
    conversationId?: number,
    receiverId?: number,
    content: string
}

export type Message = {
    id: number;
    content: string;
    conversationId: number;
    senderId: number;
    createdAt: string;
}

export type Slice<T> = {
    content: T[],
    number: number,
    last: boolean,
    first: boolean,
    size: number,
    numberOfElements: number,
}