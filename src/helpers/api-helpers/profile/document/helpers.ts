import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { iDocument, tDocument } from '../../../../api/rsv-profile/document/document.types'
import { profile } from '../../../../api/rsv-profile/profile'

export async function createDocument(
    instance: AxiosInstance,
    body: iDocument
): Promise<tResponse<{id: number}>> {
    return (await profile(instance).document.create(body)).data
}

export async function updateDocument(
    instance: AxiosInstance,
    body: iDocument
): Promise<tResponse<Record<string, unknown>>> {
    return (await profile(instance).document.update(body)).data
}

export async function removeDocument(
    instance: AxiosInstance,
    id: number
): Promise<tResponse<Record<string, unknown>>> {
    return (await profile(instance).document.remove(id)).data
}

export async function getDocuments(
    instance: AxiosInstance
): Promise<tResponse<tDocument>> {
    return (await profile(instance).document.documents()).data
}
