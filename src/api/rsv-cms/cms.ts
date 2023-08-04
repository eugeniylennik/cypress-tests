import { news } from './news/news'
import { AxiosInstance } from 'axios'

export const cms = (
    instance: AxiosInstance
) => {
    return {
        news: news(instance)
    }
}
