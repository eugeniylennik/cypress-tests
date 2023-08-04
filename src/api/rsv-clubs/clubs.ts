import { AxiosInstance } from 'axios'
import { news } from './news/news'
import { project } from './project/project'
import { event } from './event/event'
import { club } from './club/club'

export const clubs = (
    instance: AxiosInstance
) => {
    return {
        clubs: club(instance),
        news: news(instance),
        project: project(instance),
        event: event(instance)
    }
}
