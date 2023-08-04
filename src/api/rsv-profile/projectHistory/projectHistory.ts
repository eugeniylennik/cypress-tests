import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { iProjectHistory, tProjectHistory } from './projectHistory.types'
import { endpoints } from '../../endpoints'

export const projectHistory = (
    instance: AxiosInstance
) => {
    return {
        create: (
            body: iProjectHistory
        ): Promise<AxiosResponse<tResponse<{projectHistory: {id: number}}>>> => instance.post(
            endpoints.profile.projectHistory.create,
            body
        ),
        update: (
            body: iProjectHistory
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
            endpoints.profile.projectHistory.update,
            body
        ),
        remove: (
            id: number
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.get(
            endpoints.profile.projectHistory.remove(id)
        ),
        history: (
        ): Promise<AxiosResponse<tResponse<tProjectHistory>>> => instance.get(
            endpoints.profile.projectHistory.history
        )
    }
}
