import { AxiosInstance } from 'axios'
import { createInstance } from '@helpers/instance'
import { clubBodies } from '@bodyGenerator/clubs/club/club.bodies'
import { createClub, removeClub } from '@helpers/api-helpers/clubs/club/helpers'
import {
    createClubProject,
    getClubProjectById, removeClubProject,
    updateClubProject
} from '@helpers/api-helpers/clubs/project/helpers'
import { clubProjectBodies } from '@bodyGenerator/clubs/project/project.bodies'
import * as faker from 'faker'
import { StatusResponse } from '@helpers/enums'
import credits from '@data/credits'
import baseUrls from '@api/base.urls'
import authStep from '../../../rsv-auth/auth.steps'
import { iClubProject } from '../project.types'

describe('Club project', () => {

    let instance: AxiosInstance
    let clubId: number
    let projectId: number

    beforeAll(async () => {
        instance = createInstance()
        await authStep(instance).setAuthTokenHeader(credits.admin)
    })

    beforeEach(async () => {
        const clubBody = clubBodies.defaultClubBody()
        clubId = (await createClub(instance, clubBody)).data.club.id
    })

    test('Create new project to club POST [/project/create]', async () => {
        const clubProjectBody = clubProjectBodies.defaultProjectBody(clubId)

        const clubProject = await createClubProject(instance, clubProjectBody)
        projectId = clubProject.data.project.id

        expect(clubProject.status).toBe(StatusResponse.SUCCESS)
        expect(clubProject.data.project).toMatchObject(clubProjectBody)
    })

    describe('Updating club project', () => {

        let clubProjectBody: iClubProject

        beforeEach(async () => {
            clubProjectBody = clubProjectBodies.defaultProjectBody(clubId)
            projectId = (await createClubProject(instance, clubProjectBody)).data.project.id
        })

        test('Get club project by id GET [/project/${id}]', async () => {
            const clubProject = await getClubProjectById(instance, projectId)

            expect(clubProject.status).toBe(StatusResponse.SUCCESS)
            expect(clubProject.data.project).toMatchObject(clubProjectBody)
        })

        test('Update club project POST [/project/${id}/update]', async () => {
            const clubProjectBody = Object.assign({},
                clubProjectBodies.defaultProjectBody(clubId), {
                    isDraft: false,
                    materials: [{
                        title: faker.lorem.paragraph(),
                        size: 30,
                        link: `${baseUrls.clubs.url}`
                    }]
                })

            const clubProject = await updateClubProject(instance, projectId, clubProjectBody)

            expect(clubProject.status).toBe(StatusResponse.SUCCESS)
            expect(clubProject.data.project).toMatchObject(clubProjectBody)
        })

        test('Remove club project POST [/project/${id}/remove]', async () => {
            const clubProject = await removeClubProject(instance, projectId)

            expect(clubProject.status).toBe(StatusResponse.SUCCESS)
            expect(clubProject.message).toBeNull()
            expect(clubProject.data).toEqual([])
        })
    })

    afterEach(async () => {
        await removeClubProject(instance, projectId)
        await removeClub(instance, clubId)
    })
})
