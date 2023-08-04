import { iClub, iClubMembers } from './club.types'
import { tAccessRole } from '@data/types'

export type tClubResponse = {
    club: iClubData
}

export interface iClubData extends iClub {
    id: number
    createdAt: string
    createdBy: number
}

export type tClubMembersResponse = {
    member: iClubMembersData
}

export interface iClubMembersData extends iClubMembers {
    season: string | null
    status: string | null
    role: tAccessRole
    createdAt: string
    profile: tProfile
}

export type tProfile = {
    id: number
    firstName: string
    lastName: string
    email: string | null
    imgUrl: string | null
    position: string | null
    activity: string[] | null
    organization: string | null
}
