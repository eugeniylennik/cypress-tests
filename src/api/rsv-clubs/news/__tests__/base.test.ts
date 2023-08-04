import { clubBodies } from '@bodyGenerator/clubs/club/club.bodies'
import { createClub, removeClub } from '@helpers/api-helpers/clubs/club/helpers'
import { clubNewsBodies } from '@bodyGenerator/clubs/news/news.bodies'
import {
    createClubNews,
    getNewsById,
    removeClubNews,
    updateClubNews
} from '@helpers/api-helpers/clubs/news/helpers'
import { createInstance } from '@helpers/instance'
import { AxiosInstance } from 'axios'
import { StatusResponse } from '@helpers/enums'
import credits from '@data/credits'
import authStep from '../../../rsv-auth/auth.steps'
import { iClubNews } from '../news.types'

describe('Club cms', () => {

    let instance: AxiosInstance
    let clubId: number
    let newsId: number

    beforeAll(async () => {
        instance = createInstance()
        await authStep(instance).setAuthTokenHeader(credits.admin)
    })

    beforeEach(async () => {
        const clubBody = clubBodies.defaultClubBody()
        clubId = (await createClub(instance, clubBody)).data.club.id
    })

    test('Create new cms to club [/cms/create]', async () => {
        const newsBody = clubNewsBodies.defaultClubNewsBody(clubId)

        const news = await createClubNews(instance, newsBody)
        newsId = news.data.news.id

        expect(news.status).toBe(StatusResponse.SUCCESS)
        expect(news.data.news).toMatchObject(newsBody)
    })

    describe('Updating cms', () => {

        let newsBody: iClubNews

        beforeEach(async () => {
            newsBody = clubNewsBodies.defaultClubNewsBody(clubId)
            newsId = (await createClubNews(instance, newsBody)).data.news.id
        })

        test('Get cms by id GET [/cms/${id}]', async () => {
            const newsResponse = await getNewsById(instance, newsId)

            expect(newsResponse.status).toBe(StatusResponse.SUCCESS)
            expect(newsResponse.data.news).toMatchObject(newsBody)
        })

        test('Update cms POST [/cms/${id}/update]', async () => {
            const newsBody = Object.assign({},
                clubNewsBodies.defaultClubNewsBody(clubId),
                {isDraft: false}
            )

            const newsResponse = await updateClubNews(instance, newsId, newsBody)

            expect(newsResponse.status).toBe(StatusResponse.SUCCESS)
            expect(newsResponse.data.news).toMatchObject(newsBody)
        })

        test('Remove cms POST [/cms/${id}/remove]', async () => {
            const newsResponse = await removeClubNews(instance, newsId)

            expect(newsResponse.status).toBe(StatusResponse.SUCCESS)
            expect(newsResponse.message).toBeNull()
            expect(newsResponse.data).toEqual([])
        })
    })

    afterEach(async () => {
        await removeClubNews(instance, newsId)
        await removeClub(instance, clubId)
    })
})
