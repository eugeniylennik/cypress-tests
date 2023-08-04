import { AxiosInstance, AxiosResponse } from 'axios'
import { iNews, tNewsFilterParams } from './news.types'
import { endpoints } from '../../endpoints'
import { iNewsCreateResponse, iNewsGetResponse, tNewsResponse } from './news.response.types'
import { tResponse } from '../../../data/types'

export const news = (
    instance: AxiosInstance
) => {
    return {
        news: {
            create: (
                body: iNews
            ):Promise<AxiosResponse<tResponse<iNewsCreateResponse>>> => instance.post(
                endpoints.cms.news.create,
                body
            ),
            remove: (
                id: number
            ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.get(
                endpoints.cms.news.remove(id)
            ),
            getById: (
                id: number
            ): Promise<AxiosResponse<tResponse<iNewsGetResponse>>> => instance.get(
                endpoints.cms.news.getById(id)
            ),
            update: (
                body: iNews
            ): Promise<AxiosResponse<tResponse<tNewsResponse>>> => instance.post(
                endpoints.cms.news.update,
                body
            ),
            getAll: (
                params: tNewsFilterParams
            ):Promise<AxiosResponse<tResponse<iNewsGetResponse>>> => instance.get(
                endpoints.cms.news.getAll(),
                { params: params }
            )
        }
    }
}
