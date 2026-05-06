import type { ContactUser } from "@/schema/Contact"

export type Conversation = {
    id: number,
    otherPerson: ContactUser,
    isVirtual?: boolean,
    createdAt: string,
    hasNewMessage?: boolean
}

export type MessageSendRequest = {
    conversationId?: number,
    receiverId?: number,
    content: string,
    type: "TEXT" | "DOC"
}

export type Message = {
    id: number,
    content: string,
    conversationId: number,
    senderId: number,
    createdAt: string,
    type: "TEXT" | "DOC"
}

export type GeneratedMessage = {
    message: string
}

export type Slice<T> = {
    content: T[],
    number: number,
    last: boolean,
    first: boolean,
    size: number,
    numberOfElements: number,
}