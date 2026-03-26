export type MessageRequest = {
    message: string,
    receiverId: number
}

export type MessageResponse = {
    id: number,
    message: string,
    receiverId: number,
    senderId: number,
    timestamp: string
}