import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { iClubNews, tClubNewsResponse } from '../../../../api/rsv-clubs/news/news.types'
import { clubs } from '../../../../api/rsv-clubs/clubs'

export async function getNewsById(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<tClubNewsResponse>> {
    return (await clubs(instance).news.getById(id)).data
}

export async function createClubNews(
    instance: AxiosInstance,
    body: iClubNews
): Promise<tResponse<tClubNewsResponse>> {
    return (await clubs(instance).news.create(body)).data
}

export async function updateClubNews(
    instance: AxiosInstance,
    id: number,
    body: iClubNews
): Promise<tResponse<tClubNewsResponse>> {
    return (await clubs(instance).news.update(id, body)).data
}

export async function removeClubNews(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<Record<string, unknown>>> {
    return (await clubs(instance).news.remove(id)).data
}
