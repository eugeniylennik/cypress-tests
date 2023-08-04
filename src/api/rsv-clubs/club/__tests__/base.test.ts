import { AxiosInstance } from 'axios'
import { createInstance } from '@helpers/instance'
import { clubBodies } from '@bodyGenerator/clubs/club/club.bodies'
import {
    createClub,
    createMembers,
    getClubById,
    removeClub,
    removeMembers,
    updateClub,
    updateMembers
} from '@helpers/api-helpers/clubs/club/helpers'
import { membersBodies } from '@bodyGenerator/clubs/club/members.bodies'
import { StatusResponse } from '@helpers/enums'
import credits from '@data/credits'
import authStep from '../../../rsv-auth/auth.steps'
import { iClub, iClubMembers } from '../club.types'

describe('rsv-clubs tests', () => {

    let instance: AxiosInstance
    let userId: number
    let clubId: number

    beforeAll(async () => {
        instance = createInstance()
        userId = await authStep(instance).setAuthTokenHeader(credits.admin)
    })

    test('Create new club POST [/club/create]', async () => {
        const clubBody = clubBodies.defaultClubBody()

        const club = await createClub(instance, clubBody)
        clubId = club.data.club.id
        //В респонсе нет этих полей, для сравнения объектов нужно удалить поля из объекта clubBody
        delete clubBody.defaultSeason
        delete clubBody.seasonCatalog

        expect(club.status).toBe(StatusResponse.SUCCESS)
        expect(club.data.club).toMatchObject(clubBody)
        expect(club.data.club.createdBy).toBe(userId)
    })

    describe('Updating clubs', () => {

        let clubBody: iClub

        beforeEach(async () => {
            clubBody = clubBodies.defaultClubBody()
            clubId = (await createClub(instance, clubBody)).data.club.id
        })

        test('Get club by id GET [/club/${id}]', async () => {
            const club = await getClubById(instance, clubId)

            delete clubBody.defaultSeason
            delete clubBody.seasonCatalog

            expect(club.status).toBe(StatusResponse.SUCCESS)
            expect(club.data.club).toMatchObject(clubBody)
            expect(club.data.club.createdBy).toBe(userId)
        })

        test('Update club POST [/club/${id}/update]', async () => {
            const clubBody = Object.assign({}, clubBodies.defaultClubBody(), {
                portfolioSettings: {
                    enabled: true,
                    likeRequestEnabled: true,
                    likeRequestStopped: true,
                    createRequestEnabled: true
                }
            })

            const club = (await updateClub(instance, clubId, clubBody))
            clubId = club.data.club.id

            delete clubBody.defaultSeason
            delete clubBody.seasonCatalog

            expect(club.status).toBe(StatusResponse.SUCCESS)
            expect(club.data.club).toMatchObject(clubBody)
            expect(club.data.club.createdBy).toBe(userId)
        })

        test('Remove club POST [/club/${id}/remove]', async () => {
            const club = await removeClub(instance, clubId)

            expect(club.status).toBe(StatusResponse.SUCCESS)
            expect(club.message).toBeNull()
            expect(club.data).toEqual([])
        })

        describe('Club members', () => {

            let membersId: number

            test('Create club members POST [/club/members/create]', async () => {
                const membersBody = membersBodies.defaultMembersBody({userId: userId, clubId: clubId})

                const members = await createMembers(instance, membersBody)
                membersId = members.data.member.userId
                expect(members.status).toBe(StatusResponse.SUCCESS)
                expect(members.data.member).toMatchObject(membersBody)
            })

            describe('Updating club members', () => {

                let membersBody: iClubMembers

                beforeEach(async () => {
                    membersBody = membersBodies.defaultMembersBody({userId: userId, clubId: clubId})
                    membersId = (await createMembers(instance, membersBody)).data.member.userId
                })

                test('Update club members POST [/club/members/update]', async () => {
                    const membersBody = Object.assign({},
                        membersBodies.defaultMembersBody({userId: userId, clubId: clubId}), {
                            isHidden: false,
                            isClubMember: true,
                            hobby: ['update', 'auto', 'test']
                        })

                    const members = await updateMembers(instance, membersBody)
                    expect(members.status).toBe(StatusResponse.SUCCESS)
                    expect(members.data.member).toMatchObject(membersBody)
                })

                test('Remove club members POST [/club/members/remove]', async () => {
                    const members = await removeMembers(instance, {userId: userId, club: clubId})

                    expect(members.status).toBe(StatusResponse.SUCCESS)
                    expect(members.message).toBeNull()
                    expect(members.data).toEqual([])
                })
            })

            afterEach(async () => {
                await removeMembers(instance, {userId: membersId, club: clubId})
            })
        })
    })

    afterEach(async () => {
        await removeClub(instance, clubId)
    })
})
