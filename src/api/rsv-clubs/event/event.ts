import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { iClubEvent, tClubEventResponse } from './event.types'
import { endpoints } from '../../endpoints'

export const event = (
    instance: AxiosInstance
) => {
    return {
        getById: (
            id: number
        ): Promise<AxiosResponse<tResponse<tClubEventResponse>>> => instance.get(
            endpoints.clubs.event.getById(id)
        ),
        create: (
            body: iClubEvent
        ): Promise<AxiosResponse<tResponse<tClubEventResponse>>> => instance.post(
            endpoints.clubs.event.create,
            body
        ),
        update: (
            id: number,
            body: iClubEvent
        ): Promise<AxiosResponse<tResponse<tClubEventResponse>>> => instance.post(
            endpoints.clubs.event.update(id),
            body
        ),
        remove: (
            id: number
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
            endpoints.clubs.event.remove(id)
        )
    }
}
