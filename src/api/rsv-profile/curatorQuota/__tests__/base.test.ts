import { AxiosInstance } from 'axios'
import { createInstance } from '../../../../helpers/instance'
import credits from '../../../../data/credits'
import { createProject, upserdlProject } from '../../../../helpers/api-helpers/projects/project/helpers'
import { iQuota } from '../curatorQuota.types'
import {
    createInviteQuota,
    deleteInviteQuotaById, getInviteQuotaById,
    updateInviteQuota
} from '../../../../helpers/api-helpers/profile/curatorQuota/helpers'
import { getCatalogByType } from '../../../../helpers/api-helpers/data/data'
import { Catalogs, StatusResponse } from '../../../../helpers/enums'
import { generateRandomInt } from '../../../../helpers/generate.helpers'
import { tCatalog } from '../../../rsv-data/data.types'
import { iProjectResponse, tSeason } from '../../../rsv-projects/project/project.types'
import authStep from '../../../rsv-auth/auth.steps'

describe('Базовые тесты invite/curator quota', () => {

    const instance: AxiosInstance = createInstance()
    let project_history: tCatalog[]
    let project: {
        project: iProjectResponse
        season: tSeason
    }

    beforeAll(async () => {
        await authStep(instance).setAuthTokenHeader(credits.admin)
        project = await createProject(instance)

        //GET catalogs project_history
        project_history = (await getCatalogByType(instance, Catalogs.PROJECT_HISTORY)).data
    })

    describe('InviteQuota CRUD', () => {
        let inviteQuotaBody: iQuota
        let quotaId: number

        beforeEach(async () => {
            inviteQuotaBody = {
                foreignDictionaryItemId: project_history[generateRandomInt(project_history.length)].id,
                foreignEntityId: project.season.id ?? 0,
                foreignEntityType: 'season',
                size: 1000,
                nominationId: project.season.nominations?.[0].id ?? 0
            }
        })

        test('InviteQuota - POST /inviteQuota/create - expect status success and code 200 and data exist', async () => {
            const quota = await createInviteQuota(instance, inviteQuotaBody)
            quotaId = quota.data.data.id ?? 0
            delete inviteQuotaBody.foreignDictionaryItemId
            expect(quota.status).toBe(200)
            expect(quota.data.status).toEqual(StatusResponse.SUCCESS)
            expect(quota.data.data).toMatchObject(inviteQuotaBody)
        })

        test('InviteQuota - POST /inviteQuota/create size=0 - expect status success and code 200', async () => {
            inviteQuotaBody.size = 0

            const quota = await createInviteQuota(instance, inviteQuotaBody)
            quotaId = quota.data.data.id ?? 0
            delete inviteQuotaBody.foreignDictionaryItemId
            expect(quota.status).toBe(200)
            expect(quota.data.status).toBe(StatusResponse.SUCCESS)
            expect(quota.data.data).toMatchObject(inviteQuotaBody)
        })

        test('InviteQuota - POST /inviteQuota/create empty body - expect status error', async () => {
            inviteQuotaBody = <iQuota>{}

            const quota = await createInviteQuota(instance, inviteQuotaBody)
            expect(quota.data.status).toBe(StatusResponse.ERROR)
        })

        describe('InviteQuota Update/Delete', () => {
            beforeEach(async () => {
                quotaId = (await createInviteQuota(instance, inviteQuotaBody)).data.data.id ?? 0
            })

            test('InviteQuota - GET /inviteQuota/get/{entityType}/{seasonId} - ' +
                'expect status success and code 200, data array quota', async () => {
                const quotas = await getInviteQuotaById(instance, {
                    entityType: inviteQuotaBody.foreignEntityType,
                    seasonId: inviteQuotaBody.foreignEntityId ?? 0
                })

                delete inviteQuotaBody.foreignDictionaryItemId
                expect(quotas.status).toBe(200)
                expect(quotas.data.status).toBe(StatusResponse.SUCCESS)
                expect(quotas.data.data).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining(Object.assign({}, inviteQuotaBody, {
                            curatorQuotas: [],
                            id: quotaId
                        }))
                    ])
                )
            })

            test('InviteQuota - GET /inviteQuota/get/{entityType}/{seasonId} invalid types - expect status error and code 400', async () => {
                const quotas = await getInviteQuotaById(instance, {
                    entityType: '12345',
                    seasonId: 'abc'
                })

                expect(quotas.status).toBe(400)
                expect(quotas.data.status).toBe(StatusResponse.ERROR)
                expect(JSON.stringify(quotas.data.message)).toContain('Argument #3 ($id) must be of type int, string given')
            })

            test('InviteQuota - POST /inviteQuota/update - expect status success and code 200, data quota updated', async () => {
                inviteQuotaBody = Object.assign({}, inviteQuotaBody, {
                    id: quotaId,
                    size: 500
                })
                const quotaUpdated = await updateInviteQuota(instance, inviteQuotaBody)

                delete inviteQuotaBody.foreignDictionaryItemId
                expect(quotaUpdated.status).toBe(200)
                expect(quotaUpdated.data.status).toBe(StatusResponse.SUCCESS)
                expect(quotaUpdated.data.data).toMatchObject(inviteQuotaBody)
            })

            test('InviteQuota - POST /inviteQuota/update empty body - ' +
                'expect status error and code 400, data quota does not updated', async () => {
                inviteQuotaBody = <iQuota>{}

                const quotaUpdated = await updateInviteQuota(instance, inviteQuotaBody)
                expect(quotaUpdated.status).toBe(400)
                expect(quotaUpdated.data.status).toBe(StatusResponse.ERROR)
                expect(JSON.stringify(quotaUpdated.data.message)).toContain('NominationId not set')
            })

            test('InviteQuota - POST /inviteQuota/update size type float - expect status success and code 200', async () => {
                inviteQuotaBody = Object.assign({}, inviteQuotaBody, {
                    id: quotaId,
                    size: 50.55
                })
                const quotaUpdated = await updateInviteQuota(instance, inviteQuotaBody)

                delete inviteQuotaBody.foreignDictionaryItemId
                inviteQuotaBody.size = 50
                expect(quotaUpdated.status).toBe(200)
                expect(quotaUpdated.data.status).toBe(StatusResponse.SUCCESS)
                expect(quotaUpdated.data.data).toMatchObject(inviteQuotaBody)
            })
        })

        afterEach(async () => {
            if (quotaId !== undefined) await deleteInviteQuotaById(instance, quotaId)
        })
    })

    afterAll(async () => {
        project.project = Object.assign({}, project.project, {
            delete: true
        })
        await upserdlProject(instance, project.project)
    })
})
