export type TContact = {
    id: number,
    name: string,
    phoneNumber: string
}

export type ContactUpdateRequest = Pick<TContact, "name" | "id">;

export type ContactDeleteRequest = Pick<TContact, "id">;

export type ContactSaveRequest = Pick<TContact, "name" | "phoneNumber">;