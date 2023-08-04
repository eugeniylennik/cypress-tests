import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { iEducation, tEducation } from '../../../../api/rsv-profile/education/education.types'
import { profile } from '../../../../api/rsv-profile/profile'

export async function createEducation(
    instance: AxiosInstance,
    body: iEducation
): Promise<tResponse<{id: number}>> {
    return (await profile(instance).education.create(body)).data
}

export async function updateEducation(
    instance: AxiosInstance,
    body: iEducation
): Promise<tResponse<Record<string, unknown>>> {
    return (await profile(instance).education.update(body)).data
}

export async function removeEducation(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<Record<string, unknown>>> {
    return (await profile(instance).education.remove(id)).data
}

export async function getEducations(
    instance: AxiosInstance
): Promise<tResponse<tEducation>> {
    return (await profile(instance).education.educations()).data
}
