import * as faker from 'faker'
import baseUrls from '../../../api/base.urls'
import { generateTimeSuffix } from '@helpers/generate.helpers'
import dateTime from '../../../helpers/date'
import { iClubEvent } from '../../../api/rsv-clubs/event/event.types'

export const clubEventBodies: bodies = {
    defaultClubEventBody:(clubId: number) => ({
        club: clubId,
        isDraft: true,
        allowRegistration: false,
        newUserPreModeration: false,
        title: generateTimeSuffix('event'),
        type: 'online',
        status: 'not_started',
        date: dateTime.getDateTimeISO({month: 1}),
        program: `${baseUrls.clubs.url}/club/${clubId}`,
        address: faker.address.streetAddress(),
        phone: '+79990000000',
        contactPerson: faker.internet.userName(),
        accessRoles: ['ROLE_FINALIST', 'ROLE_WINNER', 'ROLE_SEMIFINALIST']
    })
}

type bodies = {
	defaultClubEventBody:(clubId: number) => iClubEvent
}
