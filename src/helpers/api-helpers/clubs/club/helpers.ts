import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { tClubMembersResponse, tClubResponse } from '../../../../api/rsv-clubs/club/club.response.types'
import { clubs } from '../../../../api/rsv-clubs/clubs'
import { iClub, iClubMembers } from '../../../../api/rsv-clubs/club/club.types'

export async function getClubById(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<tClubResponse>> {
    return (await clubs(instance).clubs.club.getById(id)).data
}

export async function createClub(
    instance: AxiosInstance,
    body: iClub
): Promise<tResponse<tClubResponse>> {
    return (await clubs(instance).clubs.club.create(body)).data
}

export async function updateClub(
    instance: AxiosInstance,
    id: number,
    body: iClub
): Promise<tResponse<tClubResponse>> {
    return (await clubs(instance).clubs.club.update(id, body)).data
}

export async function removeClub(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<Record<string, unknown>>> {
    return (await clubs(instance).clubs.club.remove(id)).data
}

export async function createMembers(
    instance: AxiosInstance,
    body: iClubMembers
): Promise<tResponse<tClubMembersResponse>> {
    return (await clubs(instance).clubs.members.create(body)).data
}

export async function updateMembers(
    instance: AxiosInstance,
    body: iClubMembers
): Promise<tResponse<tClubMembersResponse>> {
    return (await clubs(instance).clubs.members.update(body)).data
}

export async function removeMembers(
    instance: AxiosInstance,
    participant: {userId: number, club: number}
): Promise<tResponse<Record<string, unknown>>> {
    return (await clubs(instance).clubs.members.remove(participant)).data
}
