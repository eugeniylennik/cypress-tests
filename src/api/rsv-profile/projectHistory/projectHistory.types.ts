export interface iProjectHistory {
    id?: number | null
    dateBegin?: string | null
    dateEnd?: string | null
    foreignResultId?: number | null
    foreignSeasonId?: number | null
    summary?: string | null
    userId?: string | null
}

export type tProjectHistory = {
    histories: iProjectHistory[]
}
