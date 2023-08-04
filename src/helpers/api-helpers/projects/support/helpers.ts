import { AxiosInstance } from 'axios'
import { tResponse } from '@data/types'
import { iSupport, iSupportResponse } from '../../../../api/rsv-projects/support/support.types'
import { projects } from '../../../../api/rsv-projects/projects'

export async function createSupportRequest(
    instance: AxiosInstance,
    body: iSupport
): Promise<tResponse<iSupportResponse>> {
    return (await projects(instance).support.createSupportRequest(body)).data
}
