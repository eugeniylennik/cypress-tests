import { generateTimeSuffix } from '@helpers/generate.helpers'
import * as faker from 'faker'
import dateHelper from '../../../helpers/date'
import { iClubProject } from '../../../api/rsv-clubs/project/project.types'

export const clubProjectBodies: bodies = {
    defaultProjectBody: (clubId: number) => ({
        club: clubId,
        isDraft: true,
        accelerator: false,
        allowRegistration: false,
        newUserPreModeration: false,
        title: generateTimeSuffix('project'),
        image: '',
        description: faker.lorem.paragraph(),
        finishDate: dateHelper.getDateTimeISO({month: 1}),
        //managerId
        kpe: faker.lorem.paragraph(),
        results: faker.lorem.paragraph(),
        type: 'club',
        category: 'social',
        status: 'not_started',
        //authors
        //courses
        //pollUrl
        //materials
        accessRoles: ['ROLE_FINALIST', 'ROLE_WINNER', 'ROLE_SEMIFINALIST'],
        isCommentsEnabled: false
        //isCommentsLikesEnabled
    })
}

type bodies = {
	defaultProjectBody: (clubId: number) => iClubProject
}
