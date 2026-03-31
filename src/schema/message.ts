export type MessageStatus = "SENT" | "DELIVERED" | "READ"

export type ChatRequest = {
    message: string,
    receiverId: number
}

export type Message = {
    id: number,
    message: string,
    receiverId: number,
    senderId: number,
    timestamp: string,
    status: MessageStatus
}

export type MessageStatusRequest = {
    messageId: number,
    status: MessageStatus
}

export type MessageStatusResponse = MessageStatusRequest;

export type MessageReadRequest = {
    senderId: number
}