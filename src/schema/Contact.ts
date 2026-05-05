export type ContactUser = {
    id: number,
    name: string,
    phoneNumber: string,
    profilePictureUrl: string
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
    contactName: string,
    phoneNumber: string
}