export interface iDocument {
    id?: number
    dateOfIssue?: string | null
    files?: [] | null
    foreignDocTypeId?: number | null
    issuer?: string | null
    issuerCode?: string | null
    num?: string | null
    series?: string | null
    userId?: string | null
}

export type tDocument = {
    docs: iDocument[]
}
