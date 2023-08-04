import { tRoles } from '@data/types'
import { tAddress } from '../../rsv-data/data.types'

export type tUserInfoResponse = {
    info: tUserInfo
}

export type tUserInfo = {
    id?: number
    userId?: number | null
    user_id?: number | null
    roles?: tRoles[]
    info?: [] | null
    isLeader?: boolean
    email?: string | null
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    dateOfBirth?: string | null
    address?: tAddress | null
    foreignStatusId?: number | null
    placeOfBirth?: string | null
    placeOfBirthSpecial?: string | null
    regAddress?: string | null
    tel?: string | null
    vk?: string | null
    ok?: string | null
    instagram?: string | null
    fb?: string | null
    yt?: string | null
    desiredProfession?: string | null
    foreignMaritalStatusId?: number | null
    children?: number | null
    maidenSurname?: string | null
    isSocial?: boolean
    socialActivity?: string | null
    isVolunteer?: boolean
    volunteerActivity?: string | null
    isSecret?: boolean
    foreignGosSecretTypeId?: number | null
    gosSecretFrom?: string | null
    gosSecretTo?: string | null
    isSecretNow?: boolean
    isPartyMember?: boolean
    citizenship?: string | null
    isCriminal?: boolean
    criminal?: string | null
    warVeteran?: boolean
    isMember?: boolean
    activity?: string[] | null
    about?: string | null
    isPlaceOfBirthSpecial?: boolean
    avatar?: number | null
    avatarOfficial?: number | null
    foreignPartyMemberId?: number | null
    apiToken?: string | null
    age?: number | null
    isPatronymic?: boolean
    isNeverStudiedAtUniversity?: boolean
    isNoWorkExperience?: boolean
    desiredArea?: string | null
    curator?: number | null
    draft?: boolean
    status?: string | null
    draftEmail?: string | null
    curatorQuota?: number | null
    gender?: boolean
    regEmail?: string
    itSkills?: number[] | null
    registerFrom?: string | null
    seasonIds?: [] | null
    teamIds?: [] | null
    hiddenFields?: [tFields]
    expertise?: string | null
    registeredAt?: string
    isPrivatePage?: boolean
    zen?: string | null
    tiktok?: string | null
    syncAddressHistory?: string | null
    isTelConfirmed?: boolean
    docs?: [] | null
    projectHistories?: [] | null
    userLanguages?: tUserLanguages[] | null
    deletedAt?: string | null,
    regTel?: string | null
}

export type tUserLanguages = {
    foreignLanguageId?: number | null
    foreignLanguageLevelId?: number | null
}

export type tFields =
    | 'yt'
    | 'vk'
    | 'ok'
    | 'fb'
    | 'tel'
    | 'about'
    | 'gender'
    | 'regEmail'
    | 'instagram'
    | 'userCareers'
    | 'socialActivity'
    | 'dateOfBirth'

export type tFilterFields = (keyof tUserInfo)[]

export type tFilters = {
    fields: tFilterFields
    filters: {
        name: string,
        value: any
    }[]
}

export type tUserFilter = {
    users: [tUserInfo]
}

export type tUserIdentitySync = {
    user_id?: number,
    surname: string,
    name: string,
    patronymic: string,
    reg_email: string,
    regTel: string,
    email: string,
    tel: string,
    registerFrom: string,
    isPatronymic: string,
    dateOfBirth: string,
    address: string,
    regSource: string,
    disableUpdateNotEmpty: ''
}

export type tUserIdentitySyncResp = {
    user: {
        id: number
    }
}

export type tUserDraft = {
    address?: tAddress | null
    avatarOfficial?: []
    citizenship?: tAddress | null
    dateOfBirth?: string | null
    draftEmail: string
    foreignEducationalRoleId?: number | null
    gender?: string | null
    isPlaceOfBirthSpecial?: boolean
    name: string
    patronymic?: string | null
    placeOfBirthSpecial?: string | null
    surname: string
    tel?: string | null
    userDoc?: []
    userEducation?: []
    userLanguages?: []
}
