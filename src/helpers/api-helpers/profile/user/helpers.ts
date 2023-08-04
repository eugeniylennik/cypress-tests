import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import {
    tFilters,
    tUserFilter,
    tUserIdentitySync,
    tUserIdentitySyncResp,
    tUserInfo,
    tUserInfoResponse
} from '../../../../api/rsv-profile/user/user.types'
import { user } from '../../../../api/rsv-profile/user/user'

export async function getUserProfileById(
    instance: AxiosInstance,
    userId: number
): Promise<tResponse<tUserInfoResponse>> {
    return (await user(instance).user.getUserProfile(userId)).data
}

export async function updateUserInfoProfile(
    instance: AxiosInstance,
    body: tUserInfo
): Promise<tResponse<Record<string, unknown>>> {
    return (await user(instance).user.updateUserInfoProfile(body)).data
}

export async function updateUserProfile(
    instance: AxiosInstance,
    body: tUserInfo
): Promise<tResponse<Record<string, unknown>>> {
    return (await user(instance).user.updateUserProfile(body)).data
}

export async function getUsersByFilter(
    instance: AxiosInstance,
    body: tFilters
): Promise<tResponse<tUserFilter>> {
    return (await user(instance).user.getUsersByFilter(body)).data
}

export async function markAsDeleted(
    instance: AxiosInstance,
    body: { userId: number }
): Promise<tResponse<[]>> {
    return (await user(instance).user.markAsDeleted(body)).data
}

export async function deletePersonData(
    instance: AxiosInstance,
    body: { ids: number[] }
): Promise<tResponse<[]>> {
    return (await user(instance).user.deletePersonData(body)).data
}

export async function userIdentitySync(
    instance: AxiosInstance,
    body: tUserIdentitySync
): Promise<tResponse<tUserIdentitySyncResp>> {
    return (await user(instance).user.userIdentitySync(body)).data
}
