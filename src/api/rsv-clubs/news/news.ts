import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { iClubNews, tClubNewsResponse } from './news.types'
import { endpoints } from '../../endpoints'

export const news = (
    instance: AxiosInstance
) => {
    return {
        getById: (
            id: number
        ): Promise<AxiosResponse<tResponse<tClubNewsResponse>>> => instance.get(
            endpoints.clubs.news.getById(id)
        ),
        create: (
            body: iClubNews
        ): Promise<AxiosResponse<tResponse<tClubNewsResponse>>> => instance.post(
            endpoints.clubs.news.create,
            body
        ),
        update: (
            id: number,
            body: iClubNews
        ): Promise<AxiosResponse<tResponse<tClubNewsResponse>>> => instance.post(
            endpoints.clubs.news.update(id),
            body
        ),
        remove: (
            id: number
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
            endpoints.clubs.news.remove(id)
        )
    }
}
