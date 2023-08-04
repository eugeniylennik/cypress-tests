import { AxiosInstance } from 'axios'
import { support } from './support/support'
import { project } from './project/project'

export const projects = (
    instance: AxiosInstance
) => {
    return {
        project: project(instance),
        support: support(instance)
    }
}
