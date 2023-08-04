import { AxiosInstance } from 'axios'
import { user } from './user/user'
import { education } from './education/education'
import { career } from './career/career'
import { curatorQuota } from './curatorQuota/curatorQuota'
import { projectHistory } from './projectHistory/projectHistory'
import { document } from './document/document'

export const profile = (
    instance: AxiosInstance
) => {
    return {
        user: user(instance),
        education: education(instance),
        career: career(instance),
        document: document(instance),
        projectHistory: projectHistory(instance),
        quota: curatorQuota(instance)
    }
}
