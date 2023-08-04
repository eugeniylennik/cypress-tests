import { AxiosInstance } from 'axios'
import { createInstance } from '../../../../helpers/instance'
import authStep from '../../../rsv-auth/auth.steps'
import credits from '../../../../data/credits'
import { newsBodies } from '../../../../body-generator/cms/news/news.bodies'
import {
    createNews,
    getAllNews,
    getNewsById,
    removeNews,
    updateNews
} from '../../../../helpers/api-helpers/cms/news/helpers'
import { iNews } from '../news.types'
import { StatusResponse } from '../../../../helpers/enums'

describe('rsv-cms news tests', () => {
    let instance: AxiosInstance
    let newsId: number

    beforeAll(async () => {
        instance = createInstance()
        await authStep(instance).setAuthTokenHeader(credits.admin)
    })

    describe('Public news tests', () => {

        test('Create public news POST [/entity/insert/cms]', async () => {
            const newsBody = newsBodies.defaultPublicNewsBody()
            const news = await createNews(instance, newsBody)
            newsId = news.data.id
            expect(news.status).toBe(StatusResponse.SUCCESS)
            expect(newsId).not.toBeNull()
        })

        describe('Update public news', () => {
            let newsBody: iNews

            beforeEach(async () => {
                newsBody = newsBodies.defaultPublicNewsBody()
                newsId = (await createNews(instance, newsBody)).data.id
            })

            test('Get public news by id GET [/entity/select/cms/cms?id]', async () => {
                const news = await getNewsById(instance, newsId)
                expect(news.status).toBe(StatusResponse.SUCCESS)
                expect(news.data.list[0]).toMatchObject(newsBody)
                expect(news.data.count).toBe(1)
            })

            test('Update public news POST [/entity/update/cms]', async () => {
                const newsBodyUpdate = newsBodies.defaultPublicNewsBody()
                const news = await updateNews(instance, newsId, newsBodyUpdate)
                expect(news.status).toBe(StatusResponse.SUCCESS)
                const newsList = (await getNewsById(instance, newsId)).data.list
                expect(newsList[0]).toMatchObject(newsBodyUpdate)
            })

            test('Delete public news POST [/entity/update/cms]', async () => {
                const news = await removeNews(instance, newsId)
                expect(news.status).toBe(StatusResponse.SUCCESS)
                const newsList = (await getNewsById(instance, newsId)).data.list
                expect(newsList).toEqual([])
            })

            test('Get all public news Get [/entity/select/cms?isPublic=true]', async () => {
                const news = await getAllNews(instance, {isPublic: true})
                const newsList = news.data.list
                newsList.forEach((news: iNews) => expect(news.isDraft).toEqual(false))
                expect(news.status).toBe(StatusResponse.SUCCESS)
                //Ищем в массиве id созданной новости
                const newsIdInList = newsList.find((news: iNews) => news.id === newsId)?.id
                expect(newsIdInList).toEqual(newsId)
            })
        })
    })

    describe('Draft news tests', () => {
        let newsBody: iNews

        test('Create draft news POST [/entity/insert/cms]', async () => {
            newsBody = newsBodies.draftNewsBody()
            const news = await createNews(instance, newsBody)
            expect(news.status).toBe(StatusResponse.SUCCESS)
            expect(newsId).not.toBeNull()
            newsId = news.data.id
        })

        describe('Get draft news tests', () => {

            beforeEach(async () => {
                newsBody = newsBodies.draftNewsBody()
                newsId = (await createNews(instance, newsBody)).data.id
            })

            test('Get draft news by id GET [/entity/select/cms/cms?id]', async () => {
                const news = await getNewsById(instance, newsId)
                expect(news.status).toBe(StatusResponse.SUCCESS)
                expect(news.data.list).toEqual([])
                expect(news.data.count).toBe(0)
            })

            test('Get draft news in list Get [/entity/select/cms?isDraft=all]', async () => {
                const news = await getAllNews(instance, {isDraft: 'all'})
                const draftNewsBody = news.data.list.find((m: iNews) => m.id === newsId)
                expect(news.status).toBe(StatusResponse.SUCCESS)
                expect(draftNewsBody).toMatchObject(newsBody)
            })

            test('Get draft news in public list Get [/entity/select/cms?isPublic=true]', async () => {
                const news = await getAllNews(instance, {isPublic: true})
                const draftNewsId = news.data.list.find((m: iNews) => m.id === newsId)
                expect(draftNewsId).toBeUndefined()
            })
        })
    })

    afterEach(async () => {
        await removeNews(instance, newsId)
    })
})
