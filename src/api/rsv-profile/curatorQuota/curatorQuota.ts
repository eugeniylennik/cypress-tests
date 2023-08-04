import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '../../../data/types'
import { iQuota, tCuratorQuotas, tEntity } from './curatorQuota.types'
import { endpoints } from '../../endpoints'

export const curatorQuota = (
    instance: AxiosInstance
) => {
    return {
        inviteQuota: {
            create: (
                body: iQuota
            ): Promise<AxiosResponse<tResponse<iQuota>>> => instance.post(
                endpoints.profile.inviteQuota.create,
                body
            ),
            update: (
                body: iQuota
            ): Promise<AxiosResponse<tResponse<iQuota>>> => instance.post(
                endpoints.profile.inviteQuota.update,
                body
            ),
            getInviteQuotaById: (
                entityType: tEntity | string,
                seasonId: number | string
            ): Promise<AxiosResponse<tResponse<iQuota[]>>> => instance.get(
                endpoints.profile.inviteQuota.getInviteQuotaById(entityType, seasonId)
            ),
            deleteInviteQuotaById: (
                quotaId: number
            ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.get(
                endpoints.profile.inviteQuota.deleteInviteQuotaById(quotaId)
            )
        },
        curatorQuota: {
            create: (
                body: tCuratorQuotas
            ): Promise<AxiosResponse<tResponse<tCuratorQuotas>>> => instance.post(
                endpoints.profile.curatorQuota.create,
                body
            )
        }
    }
}
