export type LoginRequest = {
    phoneNumber: string,
    password: string
}

export type AuthResponse = {
    token: string,
    userId: number,
    phoneNumber: string,
    name: string,
    role: "ROLE_USER" | "ROLE_ADMIN"
}