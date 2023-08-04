export interface iQuota {
    curatorQuotas?: tCuratorQuotas[]
    foreignDictionaryItemId?: number
    foreignEntityId?: number
    foreignEntityType: tEntity
    size: number
    id?: number,
    nominationId: number
}

export type tCuratorQuotas = {
    foreignUserId: number
    id: number
    size: number
    used: number
}

export type tEntity = 'season'
