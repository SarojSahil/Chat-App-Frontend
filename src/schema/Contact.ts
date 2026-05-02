export type ContactUser = {
    id: number,
    name: string,
    phoneNumber: string,
}

export type Contact = {
    id: number,
    name: string
    user: ContactUser
}

export type ContactUpdateRequest = {
    contactId: number,
    contactName: string
}

export type ContactDeleteRequest = {
    contactId: number
}

export type ContactSaveRequest = {
    name: string,
    phoneNumber: string
}