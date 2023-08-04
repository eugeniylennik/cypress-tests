import * as faker from 'faker'
import { iSupport } from '../../../api/rsv-projects/support/support.types'

export const supportBodies: bodies = {
    defaultSupportRequestBody:(nominationId: number) => ({
        nominationId: nominationId,
        email: faker.internet.email(),
        name: faker.internet.userName(),
        message: faker.lorem.paragraph(),
        device: {
            screenWidth: 1920,
            screenHeight: 1080,
            windowInnerWidth: 1920,
            windowInnerHeight: 1080
        }
    })
}

type bodies = {
	defaultSupportRequestBody: (nominationId: number) => iSupport
}
