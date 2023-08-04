import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { iProjectHistory, tProjectHistory } from '../../../../api/rsv-profile/projectHistory/projectHistory.types'
import { profile } from '../../../../api/rsv-profile/profile'

export async function createProjectHistory(
    instance: AxiosInstance,
    body: iProjectHistory
): Promise<tResponse<{projectHistory: {id: number}}>> {
    return (await profile(instance).projectHistory.create(body)).data
}

export async function updateProjectHistory(
    instance: AxiosInstance,
    body: iProjectHistory
): Promise<tResponse<Record<string, unknown>>> {
    return (await profile(instance).projectHistory.update(body)).data
}

export async function removeProjectHistory(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<Record<string, unknown>>> {
    return (await profile(instance).projectHistory.remove(id)).data
}

export async function getProjectHistories(
    instance: AxiosInstance
): Promise<tResponse<tProjectHistory>> {
    return (await profile(instance).projectHistory.history()).data
}
