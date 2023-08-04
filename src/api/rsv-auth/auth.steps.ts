import { AxiosInstance } from 'axios'
import { tUserCredits } from '../../data/types'
import { tLoginDataResponse } from './auth.types'
import auth from './auth'
import helpers from './auth.helpers'

const authStep = (
    instance: AxiosInstance
) => {
    return {
        getAuthorizeUser: async (
            userCreds: tUserCredits
        ): Promise<tLoginDataResponse> => {
            const response = await auth(instance).loginSubmit(userCreds)
            return response.data.Data
        },
        setAuthTokenHeader: async (
            userCreds: tUserCredits
        ): Promise<number> => {
            const user = await authStep(instance).getAuthorizeUser(userCreds)
            helpers(instance).setAuthHeaders(user.jwt)
            return user.user_id
        }
    }
}

export default authStep
