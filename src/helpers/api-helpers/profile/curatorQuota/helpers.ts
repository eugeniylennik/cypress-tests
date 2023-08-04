import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '../../../../data/types'
import { iQuota, tCuratorQuotas, tEntity } from '../../../../api/rsv-profile/curatorQuota/curatorQuota.types'
import { profile } from '../../../../api/rsv-profile/profile'

export async function createInviteQuota(
    instance: AxiosInstance,
    body: iQuota
): Promise<AxiosResponse<tResponse<iQuota>>> {
    return await profile(instance).quota.inviteQuota.create(body)
}

export async function updateInviteQuota(
    instance: AxiosInstance,
    body: iQuota
): Promise<AxiosResponse<tResponse<iQuota>>> {
    return await profile(instance).quota.inviteQuota.update(body)
}

export async function getInviteQuotaById(
    instance: AxiosInstance,
    params: {
        entityType: tEntity | string,
        seasonId: number | string
    }
): Promise<AxiosResponse<tResponse<iQuota[]>>> {
    return await profile(instance).quota.inviteQuota.getInviteQuotaById(
        params.entityType,
        params.seasonId
    )
}

export async function deleteInviteQuotaById(
    instance: AxiosInstance,
    quotaId: number
): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> {
    return await profile(instance).quota.inviteQuota.deleteInviteQuotaById(quotaId)
}

export async function createCuratorQuota(
    instance: AxiosInstance,
    body: tCuratorQuotas
): Promise<AxiosResponse<tResponse<tCuratorQuotas>>> {
    return await profile(instance).quota.curatorQuota.create(body)
}
