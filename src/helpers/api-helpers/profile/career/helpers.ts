import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { iCareer, tCareer } from '../../../../api/rsv-profile/career/career.types'
import { profile } from '../../../../api/rsv-profile/profile'

export async function createCareer(
    instance: AxiosInstance,
    body: iCareer
): Promise<tResponse<{id: number}>> {
    return (await profile(instance).career.create(body)).data
}

export async function updateCareer(
    instance: AxiosInstance,
    body: iCareer
): Promise<tResponse<Record<string, unknown>>> {
    return (await profile(instance).career.update(body)).data
}

export async function removeCareer(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<Record<string, unknown>>> {
    return (await profile(instance).career.remove(id)).data
}

export async function getCareers(
    instance: AxiosInstance
): Promise<tResponse<tCareer>> {
    return (await profile(instance).career.careers()).data
}
