import axios, { AxiosInstance } from 'axios'
import { printErrorLog, printResponseLog } from '@helpers/helpers'

export function createInstance(): AxiosInstance {
    const instance = axios.create()

    instance.interceptors.request.use((config) => {
        return config
    }, (error) => {
        printErrorLog(error, instance)
        return error.response
    })

    instance.interceptors.response.use((response) => {
        if (process.env.IS_ENABLED_LOGS === 'true') printResponseLog(response, instance)
        return response
    }, (error) => {
        if (process.env.IS_ENABLED_LOGS === 'true') printErrorLog(error, instance)
        return error.response
    })

    return instance
}
