import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { tClubMembersResponse, tClubResponse } from './club.response.types'
import { iClub, iClubMembers } from './club.types'
import { endpoints } from '../../endpoints'

export const club = (
    instance: AxiosInstance
) => {
    return {
        club: {
            getById: (
                id: number
            ): Promise<AxiosResponse<tResponse<tClubResponse>>> => instance.get(
                endpoints.clubs.club.getById(id)
            ),
            create: (
                body: iClub
            ): Promise<AxiosResponse<tResponse<tClubResponse>>> => instance.post(
                endpoints.clubs.club.create,
                body
            ),
            update: (
                id: number,
                body: iClub
            ): Promise<AxiosResponse<tResponse<tClubResponse>>> => instance.post(
                endpoints.clubs.club.update(id),
                body
            ),
            remove: (
                id: number
            ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
                endpoints.clubs.club.remove(id)
            )
        },
        members: {
            create: (
                body: iClubMembers
            ): Promise<AxiosResponse<tResponse<tClubMembersResponse>>> => instance.post(
                endpoints.clubs.club.members.create,
                body
            ),
            update: (
                body: iClubMembers
            ): Promise<AxiosResponse<tResponse<tClubMembersResponse>>> => instance.post(
                endpoints.clubs.club.members.update,
                body
            ),
            remove: (
                participant: {userId: number, club: number}
            ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
                endpoints.clubs.club.members.remove,
                participant
            )
        }
    }
}
