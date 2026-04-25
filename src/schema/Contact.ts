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

export type ContactUpdateRequest = Pick<Contact, "name" | "id">;

export type ContactDeleteRequest = Pick<Contact, "id">;

export type ContactSaveRequest = Pick<Contact, "name"> & Pick<ContactUser, "phoneNumber">;