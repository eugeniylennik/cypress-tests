import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { iProject, iProjectResponse, tSeason } from './project.types'
import { endpoints } from '../../endpoints'

export const project = (
    instance: AxiosInstance
) => {
    return {
        upserdlProject: (
            body: iProject
        ): Promise<AxiosResponse<tResponse<iProjectResponse>>> => instance.post(
            endpoints.projects.project.upserdl,
            body
        ),
        upserdlSeason: (
            body: tSeason
        ): Promise<AxiosResponse<tResponse<tSeason>>> => instance.post(
            endpoints.projects.season.upserdl,
            body
        )
    }
}
