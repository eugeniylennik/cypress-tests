import { AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import { iSupport, iSupportResponse } from './support.types'
import { endpoints } from '../../endpoints'

export const support = (
    instance: AxiosInstance
) => {
    return {
        getListSupportRequestsAdmin: (
        ): Promise<AxiosResponse<tResponse<iSupportResponse[]>>> => instance.get(
            endpoints.projects.support.adminSupportRequests
        ),
        getSupportRequestByIdAdmin: (
            requestId: number
        ): Promise<AxiosResponse<tResponse<iSupportResponse>>> => instance.get(
            endpoints.projects.support.adminSupportRequestById(requestId)
        ),
        createSupportRequest: (
            body: iSupport
        ): Promise<AxiosResponse<tResponse<iSupportResponse>>> => instance.post(
            endpoints.projects.support.supportRequest,
            body
        ),
        getSupportRequests: (
        ): Promise<AxiosResponse<tResponse<iSupportResponse[]>>> => instance.get(
            endpoints.projects.support.supportRequest
        ),
        getSupportRequestById: (
            requestId: number
        ): Promise<AxiosResponse<tResponse<iSupportResponse>>> => instance.get(
            endpoints.projects.support.supportRequestById(requestId)
        )
    }
}
