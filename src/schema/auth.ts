export type LoginRequest = {
    phoneNumber: string,
    password: string
}

export type RegisterRequest = LoginRequest & {
    name: string
}

export type AuthResponse = {
    token: string,
    userId: number,
    name: string,
    role: "ROLE_USER" | "ROLE_ADMIN"
}