import { AxiosInstance, AxiosResponse } from 'axios'
import {
    tFilters,
    tUserFilter,
    tUserIdentitySync,
    tUserIdentitySyncResp,
    tUserInfo,
    tUserInfoResponse
} from './user.types'
import { tResponse } from '@data/types'
import { endpoints } from '../../endpoints'

export const user = (
    instance: AxiosInstance
) => {
    return {
        user: {
            getUserProfile: (
                userId: number
            ): Promise<AxiosResponse<tResponse<tUserInfoResponse>>> => instance.get(
                endpoints.profile.user.getUserProfile(userId)
            ),
            updateUserInfoProfile: (
                body: tUserInfo
            ): Promise<AxiosResponse<tResponse<tUserInfoResponse>>> => instance.post(
                endpoints.profile.user.updateUserInfo,
                body
            ),
            updateUserProfile: (
                body: tUserInfo
            ): Promise<AxiosResponse<tResponse<tUserInfoResponse>>> => instance.post(
                endpoints.profile.user.updateUser,
                body
            ),
            getUsersByFilter: (
                body: tFilters
            ): Promise<AxiosResponse<tResponse<tUserFilter>>> => instance.post(
                endpoints.profile.user.getUsersByFilter,
                body
            ),
            markAsDeleted: (
                body: { userId: number }
            ): Promise<AxiosResponse<tResponse<[]>>> => instance.post(
                endpoints.profile.user.markAsDeleted,
                body
            ),
            deletePersonData: (
                body: { ids: number[] }
            ): Promise<AxiosResponse<tResponse<[]>>> => instance.post(
                endpoints.profile.user.deletePersonData,
                body
            ),
            userIdentitySync: (
                body: tUserIdentitySync
            ): Promise<AxiosResponse<tResponse<tUserIdentitySyncResp>>> => instance.post(
                endpoints.profile.user.userIdentitySync,
                body
            )
        }
    }
}
