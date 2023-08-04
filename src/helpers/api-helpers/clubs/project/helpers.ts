import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { iClubProject, tClubProjectResponse } from '../../../../api/rsv-clubs/project/project.types'
import { clubs } from '../../../../api/rsv-clubs/clubs'

export async function getClubProjectById(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<tClubProjectResponse>> {
    return (await clubs(instance).project.getById(id)).data
}

export async function createClubProject(
    instance: AxiosInstance,
    body: iClubProject
): Promise<tResponse<tClubProjectResponse>> {
    return (await clubs(instance).project.create(body)).data
}

export async function updateClubProject(
    instance: AxiosInstance,
    id: number,
    body: iClubProject
): Promise<tResponse<tClubProjectResponse>> {
    return (await clubs(instance).project.update(id, body)).data
}

export async function removeClubProject(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<Record<string, unknown>>> {
    return (await clubs(instance).project.remove(id)).data
}
