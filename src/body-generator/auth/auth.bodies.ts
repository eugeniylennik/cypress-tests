import * as faker from 'faker'
import { getDomain } from '@data/domains'
import { tUserCredsRegistration } from '../../api/rsv-auth/auth.types'

export const getUserCredsRegistration = (): tUserCredsRegistration => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        redirect_uri: `https://${getDomain()}`,
        first_name: faker.name.firstName(),
        second_name: faker.name.lastName(),
        patronymic: faker.name.prefix()
    }
}
