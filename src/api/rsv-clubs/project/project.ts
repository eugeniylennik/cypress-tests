import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { iClubProject, tClubProjectResponse } from './project.types'
import { endpoints } from '../../endpoints'

export const project = (
    instance: AxiosInstance
) => {
    return {
        getById: (
            id: number
        ): Promise<AxiosResponse<tResponse<tClubProjectResponse>>> => instance.get(
            endpoints.clubs.project.getById(id)
        ),
        create: (
            body: iClubProject
        ): Promise<AxiosResponse<tResponse<tClubProjectResponse>>> => instance.post(
            endpoints.clubs.project.create,
            body
        ),
        update: (
            id: number,
            body: iClubProject
        ): Promise<AxiosResponse<tResponse<tClubProjectResponse>>> => instance.post(
            endpoints.clubs.project.update(id),
            body
        ),
        remove: (
            id: number
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
            endpoints.clubs.project.remove(id)
        )
    }
}
