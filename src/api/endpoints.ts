import baseUrls from './base.urls'
import { tEntity } from './rsv-profile/curatorQuota/curatorQuota.types'
import { tCatalogType } from './rsv-data/data.types'

export const endpoints = {
    auth: {
        registrationSubmit: `${baseUrls.authorization.url}/registration/submit`,
        loginSubmit: `${baseUrls.authorization.url}/login/submit`,
        updateJwtToken: (
            token: string
        ): string => `${baseUrls.authorization.url}/jwt/update?refresh_token=${token}`,
        resetPassword: `${baseUrls.authorization.url}/reset-password/init/submit`,
        confirmRegistration: (
            code: string
        ): string => `${baseUrls.authorization.url}/mail/${code}`
    },
    identity: {
        connect: {
            authorize: `${baseUrls.identity.url}/connect/authorize`,
            callback: `${baseUrls.identity.url}/connect/authorize/callback`,
            token: `${baseUrls.identity.url}/connect/token`
        },
        form: {
            login: `${baseUrls.identity.url}/Account/Login`,
            twoFA: `${baseUrls.identity.url}/Account/LoginWith2Fa`,
            registration: `${baseUrls.identity.url}/Registration`,
            recovery: `${baseUrls.identity.url}/Recovery`,
            recoveryConfirm: `${baseUrls.identity.url}/Recovery/Confirm`,
            recoveryPassword: `${baseUrls.identity.url}/Recovery/Password`,
            confirmation: `${baseUrls.identity.url}/Registration/Confirmation`,
            addPhone: `${baseUrls.identity.url}/Admin/AddPhone`,
            addPhoneConfirmation: `${baseUrls.identity.url}/Admin/Confirmation`,
            repeatCode: `${baseUrls.identity.url}/Registration/RepeatCode`
        },
        redirection: {
            callbackLocation: (path: string): string => `/connect/authorize/callback?${new URLSearchParams(path)
                .toString().replace('+', '%20')}`,
            login: (path: string): string => `${endpoints.identity.form.login}${path}`,
            registration: (path: string): string => `${endpoints.identity.form.registration}${path}`,
            recovery: (path: string): string => `${endpoints.identity.form.recovery}${path}`
        },
        headOffice: {
            registrationType: `${baseUrls.identity.url}/api/v1/statistics/registrations/type`,
            usersCount: (
                filterYear?: number
            ): string => filterYear ? `${baseUrls.identity.url}/api/v1/statistics/users/count?filterYear[${filterYear}]` :
                `${baseUrls.identity.url}/api/v1/statistics/users/count`,
            usersRangesCount: `${baseUrls.identity.url}/api/v1/statistics/users/rangesCount`,
            usersTotalCount: `${baseUrls.identity.url}/api/v1/statistics/users/totalCount`
        },
        internal: {
            users: {
                getRegFields: `${baseUrls.identity.url}/api/v1/user/getRegFields`,
                setRegFields: `${baseUrls.identity.url}/api/v1/user/setRegFields`,
                rolesAdd: `${baseUrls.identity.url}/api/v1/user/roles/add`,
                vkConnectId: (userId: number): string => `${baseUrls.identity.url}/api/v1/users/vk-connect-id/${userId}`,
                create: `${baseUrls.identity.url}/api/v1/user/create`,
                setPassword: `${baseUrls.identity.url}/api/v1/user/setPassword`,
                markAsDeleted: `${baseUrls.identity.url}/api/v1/user/mark-as-deleted`,
                unmarkAsDeleted: `${baseUrls.identity.url}/api/v1/user/unmark-as-deleted`,
                deletePersonData: `${baseUrls.identity.url}/api/v1/user/delete-person-data`,
                sync: `${baseUrls.identity.url}/api/v1/users/sync`,
                deleteUser: (userId: number): string => `${baseUrls.identity.url}/api/v1/users/${userId}`
            }
        }
    },
    projects: {
        project: {
            upserdl: `${baseUrls.projects.url}/projects/upserdl`
        },
        season: {
            upserdl: `${baseUrls.projects.url}/season/upserdl`
        },
        support: {
            supportRequest: `${baseUrls.projects.url}/support-request/mine`,
            supportRequestById: (
                requestId: number
            ): string => `${baseUrls.projects.url}/support-request/mine/${requestId}`,
            adminSupportRequests: `${baseUrls.projects.url}/support-request`,
            adminSupportRequestById: (
                requestId: number
            ): string => `${baseUrls.projects.url}/support-request/${requestId}`
        }
    },
    profile: {
        user: {
            getUserProfile: (
                userId: number
            ): string => `${baseUrls.profile.url}/user/${userId}`,
            updateUserInfo: `${baseUrls.profile.url}/user/info/update`,
            updateUser: `${baseUrls.profile.url}/user/update`,
            getUsersByFilter: `${baseUrls.profile.url}/users/filter?limit=10&offset=0`,
            markAsDeleted: `${baseUrls.profile.url}/user/mark-as-deleted`,
            deletePersonData: `${baseUrls.profile.url}/user/delete-person-data`,
            userIdentitySync: `${baseUrls.profile.url}/user/identity/sync`,
            draft: {
                create: `${baseUrls.profile.url}/user/create/draft`,
                bulk: `${baseUrls.profile.url}/user/create/bulk`
            }
        },
        education: {
            educations: `${baseUrls.profile.url}/education`,
            create: `${baseUrls.profile.url}/education/create`,
            update: `${baseUrls.profile.url}/education/update`,
            remove: (
                id: number
            ): string => `${baseUrls.profile.url}/education/${id}/remove`
        },
        career: {
            careers: `${baseUrls.profile.url}/career`,
            create: `${baseUrls.profile.url}/career/create`,
            update: `${baseUrls.profile.url}/career/update`,
            remove: (
                id: number
            ): string => `${baseUrls.profile.url}/career/${id}/remove`
        },
        document: {
            docs: `${baseUrls.profile.url}/docs`,
            create: `${baseUrls.profile.url}/doc/create`,
            update: `${baseUrls.profile.url}/doc/update`,
            remove: (
                id: number
            ): string => `${baseUrls.profile.url}/doc/${id}/remove`
        },
        projectHistory: {
            history: `${baseUrls.profile.url}/project-histories`,
            create: `${baseUrls.profile.url}/project-history/create`,
            update: `${baseUrls.profile.url}/project-history/update`,
            remove: (
                id: number
            ): string => `${baseUrls.profile.url}/project-history/${id}/remove`
        },
        competence: {
            getListCompetenceUser: (
                userId: string
            ): string => `${baseUrls.profile.url}/competence/user/${userId}/findAll`
        },
        inviteQuota: {
            create: `${baseUrls.profile.url}/inviteQuota/create`,
            update: `${baseUrls.profile.url}/inviteQuota/update`,
            getInviteQuotaById: (
                entityType: tEntity | string,
                seasonId: number | string
            ): string => `${baseUrls.profile.url}/inviteQuota/get/${entityType}/${seasonId}`,
            deleteInviteQuotaById: (
                quotaId: number
            ): string => `${baseUrls.profile.url}/inviteQuota/delete/${quotaId}`
        },
        curatorQuota: {
            create: `${baseUrls.profile.url}/curatorQuota/create`
        }
    },
    data: {
        catalog: {
            catalogs: `${baseUrls.data.url}/catalog`,
            catalog: (
                catalog: tCatalogType,
                isDeleted?: boolean
            ): string => `${baseUrls.data.url}/catalog/get/${catalog}${isDeleted ? `?is_deleted=${isDeleted}` : ''}`,
            element: (
                id: number
            ): string => `${baseUrls.data.url}/element/${id}`,
            search: (
                catalog: string | tCatalogType
            ): string => {
                return `${baseUrls.data.url}/catalog/search/${catalog}`
            },
            getTypes: `${baseUrls.data.url}/catalog/get-types`,
            createCatalog: (
                catalog: string
            ): string => `${baseUrls.data.url}/catalog/edit/${catalog}`,
            createCatalogByCSV: (
                catalog: string | tCatalogType
            ): string => `${baseUrls.data.url}/catalog/upload/${catalog}`,
            delete: `${baseUrls.data.url}/catalog/delete`,
            industries: (
                query?: string
            ): string => query ? `${baseUrls.data.url}/catalog/search/industries?q=${query}` :
                `${baseUrls.data.url}/catalog/get/industries`
        },
        okso: {
            getByEducationLevelId: (
                educationLevelId: number,
                educationSpecialityId: number
            ): string => `${baseUrls.data.url}/okso/${educationLevelId}/${educationSpecialityId}`,
            getByOksoId: (
                oksoId: number
            ): string => `${baseUrls.data.url}/okso/${oksoId}`,
            create: `${baseUrls.data.url}/okso`
        }
    },
    dadata: {
        searchData: `${baseUrls.dadata.url}/search`
    },
    clubs: {
        club: {
            getById: (
                clubId: number
            ): string => `${baseUrls.clubs.url}/club/${clubId}`,
            getAll: `${baseUrls.clubs.url}/clubs`,
            create: `${baseUrls.clubs.url}/club/create`,
            update: (
                clubId: number
            ): string => `${baseUrls.clubs.url}/club/${clubId}/update`,
            remove: (
                clubId: number
            ): string => `${baseUrls.clubs.url}/club/${clubId}/remove`,
            entity: {
                roles: (
                    clubId: number
                ): string => `${baseUrls.clubs.url}/club/${clubId}/entity/roles`
            },
            members: {
                seasons: (
                    clubId: number
                ): string => `${baseUrls.clubs.url}/club/${clubId}/members/seasons`,
                create: `${baseUrls.clubs.url}/club/members/create`,
                update: `${baseUrls.clubs.url}/club/members/update`,
                remove: `${baseUrls.clubs.url}/club/members/remove`,
                members: `${baseUrls.clubs.url}/club/members`,
                requests: {
                    allRequests: `${baseUrls.clubs.url}/club/member/requests`,
                    accept: (
                        requestId: number
                    ): string => `${baseUrls.clubs.url}/club/member/requests/${requestId}/accept`,
                    reject: (
                        requestId: number
                    ): string => `${baseUrls.clubs.url}/club/member/requests/${requestId}/reject`
                }
            }
        },
        news: {
            getById: (
                newsId: number
            ): string => `${baseUrls.clubs.url}/news/${newsId}`,
            getAll: `${baseUrls.clubs.url}/news`,
            create: `${baseUrls.clubs.url}/news/create`,
            update: (
                newsId: number
            ): string => `${baseUrls.clubs.url}/news/${newsId}/update`,
            remove: (
                newsId: number
            ): string => `${baseUrls.clubs.url}/news/${newsId}/remove`
        },
        project: {
            getById: (
                projectId: number
            ): string => `${baseUrls.clubs.url}/project/${projectId}`,
            getAll: `${baseUrls.clubs.url}/projects`,
            create: `${baseUrls.clubs.url}/project/create`,
            update: (
                projectId: number
            ): string => `${baseUrls.clubs.url}/project/${projectId}/update`,
            remove: (
                projectId: number
            ): string => `${baseUrls.clubs.url}/project/${projectId}/remove`
        },
        event: {
            getById: (
                eventId: number
            ): string => `${baseUrls.clubs.url}/event/${eventId}`,
            getAll: `${baseUrls.clubs.url}/events`,
            create: `${baseUrls.clubs.url}/event/create`,
            update: (
                eventId: number
            ): string => `${baseUrls.clubs.url}/event/${eventId}/update`,
            remove: (
                eventId: number
            ): string => `${baseUrls.clubs.url}/event/${eventId}/remove`,
            members: {}
        }

    },
    cms: {
        news: {
            create: `${baseUrls.cms.url}/entity/insert/news`,
            getById: (newsId: number): string => `${baseUrls.cms.url}/entity/select/news?id=${newsId}`,
            remove: (newsId: number): string => `${baseUrls.cms.url}/entity/remove/news?id=${newsId}`,
            update: `${baseUrls.cms.url}/entity/update/news`,
            getAll: ():string => `${baseUrls.cms.url}/entity/select/news`
        }
    }
}
