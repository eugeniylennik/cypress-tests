import { AxiosInstance } from 'axios'
import { createInstance } from '@helpers/instance'
import { clubBodies } from '@bodyGenerator/clubs/club/club.bodies'
import { createClub, removeClub } from '@helpers/api-helpers/clubs/club/helpers'
import { clubEventBodies } from '@bodyGenerator/clubs/event/event.bodies'
import {
    createClubEvent,
    getClubEventById,
    removeClubEvent,
    updateClubEvent
} from '@helpers/api-helpers/clubs/event/helpers'
import * as faker from 'faker'
import { StatusResponse } from '@helpers/enums'
import credits from '@data/credits'
import baseUrls from '@api/base.urls'
import authStep from '../../../rsv-auth/auth.steps'
import { iClubEvent } from '../event.types'

describe('Club event', () => {

    let instance: AxiosInstance
    let clubId: number
    let eventId: number

    beforeAll(async () => {
        instance = createInstance()
        await authStep(instance).setAuthTokenHeader(credits.admin)
    })

    beforeEach(async () => {
        const clubBody = clubBodies.defaultClubBody()
        clubId = (await createClub(instance, clubBody)).data.club.id
    })

    test('Create new event to club POST [/event/create]', async () => {
        const eventBody = clubEventBodies.defaultClubEventBody(clubId)

        const event = await createClubEvent(instance, eventBody)
        eventId = event.data.event.id

        expect(event.status).toBe(StatusResponse.SUCCESS)
        expect(event.data.event).toMatchObject(eventBody)
    })

    describe('Updating club events', () => {

        let eventBody: iClubEvent

        beforeEach(async () => {
            eventBody = clubEventBodies.defaultClubEventBody(clubId)
            eventId = (await createClubEvent(instance, eventBody)).data.event.id
        })

        test('Get club event GET [/event/${id}]', async () => {
            const event = await getClubEventById(instance, eventId)

            expect(event.status).toBe(StatusResponse.SUCCESS)
            expect(event.data.event).toMatchObject(eventBody)
        })

        test('Update club event POST [/event/${id}/update]', async () => {
            const eventBody = Object.assign({},
                clubEventBodies.defaultClubEventBody(clubId), {
                    isDraft: false,
                    allowRegistration: true,
                    materials: [{
                        title: faker.lorem.paragraph(),
                        size: 30,
                        link: `${baseUrls.clubs.url}`
                    }]
                })

            const event = await updateClubEvent(instance, eventId, eventBody)

            expect(event.status).toBe(StatusResponse.SUCCESS)
            expect(event.data.event).toMatchObject(eventBody)
        })

        test('Remove club event POST [/event/${id}/remove]', async () => {
            const event = await removeClubEvent(instance, eventId)

            expect(event.status).toBe(StatusResponse.SUCCESS)
            expect(event.message).toBeNull()
            expect(event.data).toEqual([])
        })
    })

    afterEach(async () => {
        await removeClubEvent(instance, eventId)
        await removeClub(instance, clubId)
    })
})
