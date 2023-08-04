/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { tResponse } from '@data/types'
import * as crypto from 'crypto'
import base64url from 'base64url'

export function setAxiosHeaders(
    instance: AxiosInstance,
    headers: axiosHeader[]
): void {
    headers.forEach((header) => {
        instance.defaults.headers.common[header.name] = header.value
    })
}

type axiosHeader = {
	name: string
	value: string
}

export async function catchResponse<T>(
    request: Promise<AxiosResponse<T>>
): Promise<AxiosResponse<T>> {
    try {
        return await request
    } catch (error) {
        return error.response || error
    }
}

export async function retry<T>(
    request: () => Promise<AxiosResponse<T>>,
    maxTries: number,
    expected: { status: number, data?: string },
    timeout?: number
): Promise<AxiosResponse<T>> {
    const response = await catchResponse(request())

    console.log(`## Check ${response.config.method?.toUpperCase()} ${response.config.url} to 
	status = ${expected.status}
	${expected.data ? `and ${ expected.data}` : ''}
	${maxTries} attempts left ##`)

    const checkedData = checkResponseData(response.data, expected.data)

    if (response.status === expected.status && checkedData.check) {
        console.log(`## Successful ${response.config.method} ${response.config.url}, 
		expected: status = ${expected.status} ${expected.data ? `and ${ expected.data}` : ''}
		received: ${response.status} ${expected.data ? `and ${ checkedData.objectValue}` : ''}`)

        return response
    }
    if (maxTries > 0) {
        await sleep(timeout || 1000)
        return await retry(request, maxTries - 1, { status: expected.status, data: expected.data }, timeout)
    }

    throw new Error(`## FAILED retry: ${response.config.method} ${response.config.url}
				expected: status = ${expected.status} ${expected.data ? `and ${ expected.data}` : ''}
				received: ${response.status} ${expected.data ? `and ${ checkedData.objectValue}` : ''}##`)

}

function checkResponseData<T>(
    responseBody: T,
    expectedData?: string
) {
    if (!expectedData) return { objectValue: undefined, check: true }
    return getObjectValueByStringPath<T>(responseBody, expectedData)
}

function getObjectValueByStringPath<T>(
    obj: T,
    path: string
): {objectValue?: string, check: boolean} {
    const value = path.split('=')[1]
    if (!value) throw Error('in getObjectValueByStringPath() path has no value')

    const clearValue = value.match(/['|"]?([\d\w]+)['|"]?/)?.[1]
    if (!clearValue) throw Error('in getObjectValueByStringPath() clearValue is null')

    const pathList = path.substring(0, path.length - value.length - 1).split('.')

    const objectWalker = (obj: any, path: string[]): string | undefined => {
        if (typeof path[0] === 'number') return objectWalker(obj[Number(path[0])], path.slice(1))
        if (path.length === 1 || typeof obj?.[path[0]] === 'string') return obj?.[path[0]]

        return objectWalker(obj?.[path[0]], path.slice(1))
    }
    const objValue = objectWalker(obj, pathList)

    return { objectValue: objValue, check: objValue === clearValue }
}

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sleep(ms: number) {
    await delay(ms)

    return true
}

export function printResponseLog(response: AxiosResponse<tResponse<any>>, instance: AxiosInstance) {
    const responseData = { ...response.data }
    console.log(`
        ---------------------------------------
        URL: ${response.config.method?.toUpperCase()} ${response.config.url}
        TOKEN: ${instance.defaults.headers.get['Authorization'] ?? '-'}
        REQUEST BODY: ${response.config.data ?? '-'}
        STATUS: ${response.status} ${response.statusText}
        RESPONSE BODY: ${JSON.stringify(responseData) ?? '-'}
        ---------------------------------------`)
}

export function printErrorLog(error: AxiosError<any>, instance: AxiosInstance) {
    const errorResponse = { ...error.response?.data }
    console.error(`
        ERROR -----------------------------------------------
        URL: ${error.config.method?.toUpperCase()} ${error.config.url}
        TOKEN: ${instance.defaults.headers.get['Authorization'] ?? '-'}
        REQUEST BODY: ${error.config.data ?? '-'}
        STATUS: ${error.name} ${error.message}
        RESPONSE BODY: ${JSON.stringify(errorResponse) ?? '-'}
        -----------------------------------------------------`)
}

export function convertObjectToQueryParams(params: Record<string, unknown>) {
    return Object.keys(params).map((key) => `${key }=${ params[key]}`).join('&')
}

export function encodeBase64Uri(code_verifier: string): string {
    const base64 = crypto.createHash('sha256')
        .update(code_verifier)
        .digest('base64')
    return base64url.fromBase64(base64)
}
