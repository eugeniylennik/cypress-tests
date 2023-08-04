import { tAddress } from '../../rsv-data/data.types'

export interface iEducation {
    id?: number | null
    city?: tAddress | null
    dateEnd?: string | null
    dateStart?: string | null
    document?: null
    educationPlace?: string | null
    foreignDegreeId?: number | null
    foreignLevelId?: number | null
    foreignPlaceId?: number | null
    foreignSpecialtyId?: number | null
    isHonorsDegree?: boolean
    isNow?: boolean
    qualification?: string | null
    schoolClass?: number | null
    specialtySpecial?: string |null
    userId?: number | null,
    educationProgram?: string | null,
    faculty?: string | null,
    foreignEducationFormId?: number | null
    foreignOksoId?: number | null,
    courseNumber?: number | null
}

export type tEducation = {
    education: iEducation[]
}
