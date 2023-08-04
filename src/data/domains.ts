import { tEnvironment } from './types'
import { environment } from './environment'

export function getDomain(side?: tSide, e?: tEnvironment, port?: number): string {
    const env = e || environment
    if (env === 'localhost') return `http://${env}:${port}`
    if (side === 'web') {
        if (env !== 'prod') return `https://rsv-${env}.bizml.ru`
        return 'https://rsv.ru'
    }
    if (env !== 'prod') return `rsv-${env}.bizml.ru`
    return 'rsv.ru'
}

export type tSide = 'api' | 'web'
