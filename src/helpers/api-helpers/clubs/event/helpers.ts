import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { iClubEvent, tClubEventResponse } from '../../../../api/rsv-clubs/event/event.types'
import { clubs } from '../../../../api/rsv-clubs/clubs'

export async function getClubEventById(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<tClubEventResponse>> {
    return (await clubs(instance).event.getById(id)).data
}

export async function createClubEvent(
    instance: AxiosInstance,
    body: iClubEvent
): Promise<tResponse<tClubEventResponse>> {
    return (await clubs(instance).event.create(body)).data
}

export async function updateClubEvent(
    instance: AxiosInstance,
    id: number,
    body: iClubEvent
): Promise<tResponse<tClubEventResponse>> {
    return (await clubs(instance).event.update(id, body)).data
}

export async function removeClubEvent(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<Record<string, unknown>>> {
    return (await clubs(instance).event.remove(id)).data
}
