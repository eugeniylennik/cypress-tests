import { tQueryParams } from '../../utils/types/identity.types'
import { getDomain } from '@data/domains'
import { encodeBase64Uri } from '@helpers/helpers'
import * as randomstring from 'randomstring'

const code_verifier = randomstring.generate(128)

export function clients(params?: tQueryParams): tQueryParams {
    return {
        client_id: params?.client_id ?? 'rsv-web',
        redirect_uri: params?.redirect_uri ?? `${getDomain('web')}/account/oauth`,
        response_type: params?.response_type ?? 'code',
        scope: params?.scope ?? 'openid profile',
        state: params?.state ?? 'abc',
        code_verifier: params?.code_verifier ?? code_verifier,
        code_challenge: params?.code_challenge ?? encodeBase64Uri(code_verifier),
        code_challenge_method: params?.code_challenge_method ?? 'S256',
        response_mode: params?.response_mode ?? 'query',
        grant_type: 'authorization_code'
    }
}

export const portalClient: tQueryParams = {
    client_id: 'rsv-portal',
    redirect_uri: `${getDomain('web')}/web-callback.html`
}

export const webClient: tQueryParams = {
    client_id: 'rsv-web',
    redirect_uri: `${getDomain('web')}/account/oauth`
}

export const muramurClient: tQueryParams = {
    client_id: 'rsv-landings-muramur',
    redirect_uri: 'https://muramur2021.rsv.ru/back.html'
}

export const flagmanyClient: tQueryParams = {
    client_id: 'rsv-landings-flagmany',
    redirect_uri: 'https://flagmany.rsv-demo.bizml.ru/callback'
}

export const flagmanyMunicipalityClient: tQueryParams = {
    client_id: 'rsv-landings-flagmanymunicipality',
    redirect_uri: 'https://flagmanymunicipality.rsv.ru/callback'
}

export const flagmanyddClient: tQueryParams = {
    client_id: 'rsv-landings-flagmanyadd',
    redirect_uri: 'https://flagmanyadd.rsv.ru/callback'
}

export const studtrekClient: tQueryParams = {
    client_id: 'rsv-landings-studtrek',
    redirect_uri: 'https://studtrek.rsv.ru/callback'
}

export const womanleaderClient: tQueryParams = {
    client_id: 'rsv-landings-womanleader',
    redirect_uri: 'https://womanleader.rsv.ru/callback'
}

export const topblogClient: tQueryParams = {
    client_id: 'rsv-landings-topblog',
    redirect_uri: 'https://topblog.rsv.ru/callback'
}
