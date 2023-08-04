import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { iCareer, tCareer } from './career.types'
import { endpoints } from '../../endpoints'

export const career = (
    instance: AxiosInstance
) => {
    return {
        create: (
            body: iCareer
        ): Promise<AxiosResponse<tResponse<{ id: number }>>> => instance.post(
            endpoints.profile.career.create,
            body
        ),
        update: (
            body: iCareer
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
            endpoints.profile.career.update,
            body
        ),
        remove: (
            id: number
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.get(
            endpoints.profile.career.remove(id)
        ),
        careers: (
        ): Promise<AxiosResponse<tResponse<tCareer>>> => instance.get(
            endpoints.profile.career.careers
        )
    }
}
