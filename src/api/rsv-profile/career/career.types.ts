export interface iCareer {
    dateEnd?: string | null
    dateStart?: string | null
    foreignPositionLevelId?: number | null
    foreignWorkersNumberId?: number | null
    id?: number | null
    isUntilNow?: boolean
    organisation?: string | null
    position?: string | null
    region?: string | null
    responsibilities?: string | null
    userId?: number | null
    website?: string | null
}

export type tCareer = {
    career: iCareer[]
}
