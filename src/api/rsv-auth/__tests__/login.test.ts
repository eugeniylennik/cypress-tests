import {createInstance} from '@helpers/instance'
import {tUserCredsLogin} from '../auth.types'
import auth from '../auth'
import {tResponse} from '@data/types'
import {AxiosInstance} from 'axios'
import {getUserCredsRegistration} from '@bodyGenerator/auth/auth.bodies'
import credits from '@data/credits'
import { expect } from '@jest/globals'
import { tUserInfoResponse } from '../../rsv-profile/user/user.types'
import { user } from '../../rsv-profile/user/user'
import authStep from '../auth.steps'

describe('Auth Login', () => {

    let instance: AxiosInstance

    beforeAll(async () => {
        instance = createInstance()
    })

    test('Успешная авторизация с корректным email и password', async () => {
        const userCreds: tUserCredsLogin = {
            Email: credits.user.Email ?? '',
            Password: credits.user.Password
        }

        const response = await auth(instance).loginSubmit(userCreds)

        expect(response.data.Status).toBe('success')
        expect(response.status).toBe(200)
    })

    test('Set header x-auth-token', async () => {
        const userId = await authStep(instance).setAuthTokenHeader(credits.admin)

        const profileResponse: tResponse<tUserInfoResponse> = (await user(instance).user.getUserProfile(userId)).data

        expect(profileResponse.data.info.regEmail).toBe(credits.admin.Email)
        expect(profileResponse.data.info.roles).toEqual(credits.admin.Roles)
    })

    //Регистрации в authorization нет
    test.skip('Registration new user', async () => {
        const userCreds = getUserCredsRegistration()

        const registrationResponse = (await auth(instance).registrationSubmit(userCreds)).data

        expect(registrationResponse.Status).toBe('success')
        expect(registrationResponse.Data).toBe('Confirmation email sent')
    })
})
