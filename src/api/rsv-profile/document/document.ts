import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { iDocument, tDocument } from './document.types'
import { endpoints } from '../../endpoints'

export const document = (
    instance: AxiosInstance
) => {
    return {
        create: (
            body: iDocument
        ): Promise<AxiosResponse<tResponse<{ id: number }>>> => instance.post(
            endpoints.profile.document.create,
            body
        ),
        update: (
            body: iDocument
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
            endpoints.profile.document.update,
            body
        ),
        remove: (
            id: number
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.get(
            endpoints.profile.document.remove(id)
        ),
        documents: (
        ): Promise<AxiosResponse<tResponse<tDocument>>> => instance.get(
            endpoints.profile.document.docs
        )
    }
}
