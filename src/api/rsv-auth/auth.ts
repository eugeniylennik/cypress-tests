import { AxiosInstance, AxiosResponse } from 'axios'
import { tUserCredits } from '../../data/types'
import { endpoints } from '../endpoints'
import { tLoginResponse, tRegistrationResponse, tUserCredsRegistration } from './auth.types'

const auth = (
    instance: AxiosInstance
) => {
    return {
        loginSubmit: (
            userCreds: tUserCredits
        ): Promise<AxiosResponse<tLoginResponse>> => instance.post(
            endpoints.auth.loginSubmit,
            userCreds
        ),
        registrationSubmit: (
            userCreds: tUserCredsRegistration
        ): Promise<AxiosResponse<tRegistrationResponse>> => instance.post(
            endpoints.auth.registrationSubmit,
            userCreds
        )
    }
}

export default auth
