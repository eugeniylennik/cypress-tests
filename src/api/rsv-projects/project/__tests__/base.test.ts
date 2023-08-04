import { AxiosInstance } from 'axios'
import { createInstance } from '@helpers/instance'
import credits from '@data/credits'
import { projectBodies } from '@bodyGenerator/projects/project/project.bodies'
import { upserdlProject, upserdlSeason } from '@helpers/api-helpers/projects/project/helpers'
import { getCatalogByType } from '@helpers/api-helpers/data/data'
import { Catalogs, StatusResponse } from '@helpers/enums'
import { iProjectResponse } from '../project.types'
import authStep from '../../../rsv-auth/auth.steps'

describe('RSV-projects base test', () => {

    let instance: AxiosInstance
    let userId: number
    let project: iProjectResponse
    const projectsThematicDirections: number[] = []

    beforeAll(async () => {
        instance = createInstance()
        userId = await authStep(instance).setAuthTokenHeader(credits.admin);

        //Справочник тип прокта
        (await getCatalogByType(instance, Catalogs.PROJECTS_THEMATIC_DIRECTIONS)).data.forEach((catalog) => {
            projectsThematicDirections.push(catalog.id)
        })
    })

    test('Проверка создания проекта', async () => {
        const projectBody = Object.assign({}, projectBodies.defaultProjectBody(), {
            thematic_direction: projectsThematicDirections,
            admin_id: userId
        })

        project = (await upserdlProject(instance, projectBody)).data
        expect(project).toMatchObject(projectBody)
    })

    describe('RSV-projects season', () => {
        beforeEach(async () => {
            const projectBody = Object.assign({}, projectBodies.defaultProjectBody(), {
                thematic_direction: projectsThematicDirections,
                admin_id: userId
            })

            project = (await upserdlProject(instance, projectBody)).data
        })

        test('Проверка создания сезона проекта', async () => {
            const seasonBody = projectBodies.defaultSeasonBody(project.id)

            const season = (await upserdlSeason(instance, seasonBody))
            expect(season.status).toBe(StatusResponse.SUCCESS)
            expect(season.data).toMatchObject(seasonBody)
        })
    })

    afterEach(async () => {
        project = Object.assign({}, project, {
            delete: true
        })
        await upserdlProject(instance, project)
    })
})
