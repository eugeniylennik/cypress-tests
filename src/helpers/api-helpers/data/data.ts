import { AxiosInstance } from 'axios'
import { tDadata, tResponse } from '@data/types'
import { tAddress, tCatalog, tCatalogItemShort, tCatalogType } from '../../../api/rsv-data/data.types'
import { data } from '../../../api/rsv-data/data'

export async function getCatalogs(
    instance: AxiosInstance
): Promise<tResponse<tCatalogItemShort[]>> {
    return (await data(instance).data.catalog.getCatalogs()).data
}

export async function getCatalogByType(
    instance: AxiosInstance,
    catalog: tCatalogType,
    isDeleted?: boolean
): Promise<tResponse<tCatalog[]>> {
    return (await data(instance).data.catalog.catalog(catalog, isDeleted)).data
}

export async function getCatalogByValue(
    instance: AxiosInstance,
    catalog: tCatalogType,
    value: string
): Promise<tCatalogItemShort> {
    const result = (await data(instance).data.catalog.catalog(catalog)).data
    return result.data.find((i) => i.field_value === value)!
}

export async function getIndustries(
    instance: AxiosInstance,
    query?: string
): Promise<tResponse<tCatalog[]>> {
    return (await data(instance).data.catalog.getIndustries(query)).data
}

export async function searchData(
    instance: AxiosInstance,
    query: string,
    type: tDadata = 'address'
): Promise<tResponse<tAddress>> {
    return (await data(instance).dadata.searchData(query, type)).data
}

export async function searchCatalogData(
    instance: AxiosInstance,
    catalog: tCatalogType,
    value: string
): Promise<tCatalog> {
    const result = (await data(instance).data.catalog.searchByCatalog(catalog, value)).data
    return result.data.find((i) => i.field_value === value)!
}
