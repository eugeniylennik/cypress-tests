import { iNews } from './news.types'

export type tNewsResponse = {
    news: iNewsData
}
export interface iNewsData extends iNews {
    id: number,
    createdAt:number,
    foreignRSVId:number
    count:number
}

export interface iNewsCreateResponse {
    id: number
}

export interface iNewsGetResponse {
    list: Array<iNewsData>
    count:number
}
