import { AxiosInstance } from 'axios'
import { iNews, tNewsFilterParams } from '../../../../api/rsv-cms/news/news.types'
import { tResponse } from '../../../../data/types'
import {
    iNewsCreateResponse,
    iNewsGetResponse,
    tNewsResponse
} from '../../../../api/rsv-cms/news/news.response.types'
import { cms } from '../../../../api/rsv-cms/cms'

export async function createNews(
    instance: AxiosInstance,
    body: iNews
): Promise<tResponse<iNewsCreateResponse>> {
    return (await cms(instance).news.news.create(body)).data
}

export async function removeNews(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<Record<string, unknown>>> {
    return (await cms(instance).news.news.remove(id)).data
}

export async function getNewsById(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<iNewsGetResponse>> {
    return (await cms(instance).news.news.getById(id)).data
}

export async function updateNews(
    instance: AxiosInstance,
    id: number,
    body: iNews
): Promise<tResponse<tNewsResponse>> {
    body.id = id
    return (await cms(instance).news.news.update(body)).data
}

export async function getAllNews(
    instance: AxiosInstance,
    params: tNewsFilterParams
): Promise<tResponse<iNewsGetResponse>> {
    return (await cms(instance).news.news.getAll(params)).data
}
