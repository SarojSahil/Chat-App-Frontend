export type MessageRequest = {
    message: string,
    receiver: string
}

export type Message = {
    id: number,
    message: string,
    receiver: string,
    sender: string
}