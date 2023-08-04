export interface iNews {
    title?: string | null
    preview?: string | null
    hashtags?: string[] | null
    text?: string | null
    isPublic?: boolean
    isDraft?: boolean
    id?: number

}

export type tNewsFilterParams = {
    isPublic?: boolean
    isDraft?: 'all'
    limit?: number
    offset?: number
}

