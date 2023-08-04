import { generateRandomInt, generateTimeSuffix } from '@helpers/generate.helpers'
import * as faker from 'faker'
import { iClub } from '../../../api/rsv-clubs/club/club.types'

export const clubBodies= {
    defaultClubBody:():iClub => ({
        name: generateTimeSuffix('club'),
        mission: faker.lorem.paragraph(),
        aim: faker.lorem.paragraph(),
        worth: faker.lorem.paragraph(),
        email: faker.internet.email(),
        tel: '+79990000000',
        socialOk: 'https://ok.ru',
        socialVk: 'https://vk.com',
        socialFb: 'https://www.facebook.com',
        socialInst: 'https://instagram.com',
        socialYt: 'https://youtube.com',
        newUserPreModeration: 'deny',
        adThemeCatalog: 'clubs_ad_theme',
        seasonCatalog: 'club_season',
        defaultSeason: 'first',
        portfolioSettings: {
            enabled: false,
            likeRequestEnabled: false,
            likeRequestStopped: false,
            createRequestEnabled: false
        },
        results: {
            membersCount: `${generateRandomInt(10)}`,
            successfulProjects: `${generateRandomInt(10)}`,
            participantCount: `${generateRandomInt(100)}`,
            meetingsCount: `${generateRandomInt(10)}`,
            educationProgramsCount: `${generateRandomInt(100)}`,
            coverageRegionsCount: `${generateRandomInt(100)}`,
            projectsRequestsCount: `${generateRandomInt(100)}`
        }
    })
}

type bodies = {
    defaultClubBody:() => iClub
}

export type tClubsBodies = keyof bodies

