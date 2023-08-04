import * as faker from 'faker'
import { iCodes } from '../../cypress/utils/types/identity.types'

export function generateTimeSuffix(
    prefix: string
): string {
    const date = new Date()
    const suffix = `_AUTO_${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`

    return prefix + suffix
}

export function generateRandomText(
    prefix: string
): string {
    const date = new Date()
    return `${prefix}_AUTO_${date.getDay()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${date.getMilliseconds()}`
}

export function generateRandomInt(
    max: number
): number {
    return Math.floor(Math.random() * max)
}

export function generateRandomIntFromInterval(
    min: number,
    max: number
): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generatePhoneNumber(): { code: string, phone: string } {
    const AvailableCountryCodes: iCodes = {
        RU: ['+7', '999'], // Россия
        KZ: ['+7', '778'] // Казахстан
    }

    const keys = Object.keys(AvailableCountryCodes)
    const length = keys.length
    const random = Math.floor(Math.random() * length)
    const code = AvailableCountryCodes[keys[random]][0]
    const countryCode = AvailableCountryCodes[keys[random]][1]

    let phone = String(countryCode)

    phone += generateRandomIntFromInterval(1000000, 9999999)

    return { code, phone }
}

export function generateRandomIntBetweenNumber(
    min: number,
    max: number
): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generateImgUrl(): string {
    return faker.image.imageUrl()
}

export function generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}
