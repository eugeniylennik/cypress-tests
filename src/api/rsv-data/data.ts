import { AxiosInstance, AxiosResponse } from 'axios'
import { tDadata, tResponse } from '@data/types'
import { tAddress, tCatalog, tCatalogItemShort, tCatalogType, tDeleteCatalog } from './data.types'
import { endpoints } from '../endpoints'

export const data = (
    instance: AxiosInstance
) => {
    return {
        data: {
            catalog: {
                getCatalogs: (
                ): Promise<AxiosResponse<tResponse<tCatalogItemShort[]>>> => instance.get(
                    endpoints.data.catalog.catalogs
                ),
                catalog: (
                    catalog: tCatalogType,
                    isDeleted?: boolean
                ): Promise<AxiosResponse<tResponse<tCatalog[]>>> => instance.get(
                    endpoints.data.catalog.catalog(
                        catalog,
                        isDeleted
                    )
                ),
                getElementById: (
                    id: number
                ): Promise<AxiosResponse<tResponse<tCatalog>>> => instance.get(
                    endpoints.data.catalog.element(id)
                ),
                searchByCatalog: (
                    catalog: tCatalogType,
                    query: string
                ): Promise<AxiosResponse<tResponse<tCatalog[]>>> => instance.get(
                    endpoints.data.catalog.search(catalog), {params: {q: query}}
                ),
                getTypes: (
                ): Promise<AxiosResponse<tResponse<string[]>>> => instance.get(
                    endpoints.data.catalog.getTypes
                ),
                createCatalog:(
                    catalogType: string | tCatalogType,
                    data?: {
                        key: string
                        value: string
                    }
                ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
                    endpoints.data.catalog.createCatalog(catalogType),
                    data
                ),
                uploadCatalog:(
                    catalogType: string | tCatalogType,
                    file: any
                ): Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
                    endpoints.data.catalog.createCatalogByCSV(catalogType), file, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ),
                deleteCatalog:(
                    data: tDeleteCatalog
                ):Promise<AxiosResponse<tResponse<Record<string, unknown>>>> => instance.post(
                    endpoints.data.catalog.delete,
                    data
                ),
                getIndustries:(
                    q?: string
                ): Promise<AxiosResponse<tResponse<tCatalog[]>>> => instance.get(
                    endpoints.data.catalog.industries(q)
                )
            }
        },
        dadata: {
            searchData: (
                query: string,
                type: tDadata
            ): Promise<AxiosResponse<tResponse<tAddress>>> => {
                const params = new URLSearchParams()
                params.append('query', query)
                params.append('type', type)
                return instance.post(endpoints.dadata.searchData, params,
                    {headers: {'content-type': 'application/x-www-form-urlencoded'}}
                )
            }
        }
    }
}
