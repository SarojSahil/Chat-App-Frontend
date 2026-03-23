export type LoginRequest = {
    username: string,
    password: string
}

export type LoginResponse = {
    token: string
}

export type User = {
    id: number,
    username: string,
    authority: ["ROLE_USER" | "ROLE_ADMIN"]
}