import { AxiosInstance } from 'axios'
import { createInstance } from '@helpers/instance'
import credits from '../../../../data/credits'
import { iProjectResponse } from '../../project/project.types'
import { projectBodies } from '@bodyGenerator/projects/project/project.bodies'
import { upserdlProject } from '@helpers/api-helpers/projects/project/helpers'
import authStep from '../../../rsv-auth/auth.steps'

describe.skip('Support requests base test', () => {

    let instance: AxiosInstance
    let userId: number
    let project: iProjectResponse

    beforeAll(async () => {
        instance = createInstance()
        userId = await authStep(instance).setAuthTokenHeader(credits.admin)
    })

    beforeEach(async () => {
        const projectBody = projectBodies.defaultProjectBody()

        const project = await upserdlProject(instance, projectBody)

        console.log(JSON.stringify(project.data))
        console.log('Project_id: ', project.data.id)
    })

    test.skip('', async () => {})
})
