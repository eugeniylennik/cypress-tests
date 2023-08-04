import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { iEducation, tEducation } from './education.types'
import { endpoints } from '../../endpoints'

export const education = (
    instance: AxiosInstance
) => {
    return {
        create: (
            body: iEducation
        ): Promise<AxiosResponse<tResponse<{ id: number }>>> => instance.post(
            endpoints.profile.education.create,
            body
        ),
        update: (
            body: iEducation
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
            endpoints.profile.education.update,
            body
        ),
        remove: (
            id: number
        ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.get(
            endpoints.profile.education.remove(id)
        ),
        educations: (
        ): Promise<AxiosResponse<tResponse<tEducation>>> => instance.get(
            endpoints.profile.education.educations
        )
    }
}
