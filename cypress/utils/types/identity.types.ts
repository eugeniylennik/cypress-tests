export type tQueryParams = {
    client_id?: tClient,
    redirect_uri?: string,
    response_type?: string,
    scope?: string,
    state?: string,
    code_verifier?: string,
    code_challenge?: string,
    code_challenge_method?: string,
    response_mode?: string,
    grant_type?: string
}

export type tToken = {
    id_token?: string | null
    access_token?: string | null
    expires_in?: number | null
    token_type?: string | null
    scope?: string | null
}

export type tClient =
    | 'rsv-web'
    | 'rsv-portal'
    | 'rsv-landings-muramur'
    | 'rsv-landings-flagmany'
    | 'rsv-landings-flagmanymunicipality'
    | 'rsv-landings-flagmanyadd'
    | 'rsv-landings-studtrek'
    | 'rsv-landings-womanleader'
    | 'rsv-landings-topblog'

export type tRegistration = {
    FirstName: string
    LastName: string
    Patronymic: string
    NoPatronymic: boolean
    City: string
    SelectedDate: number
    SelectedMonth: string | number,
    SelectedYear: number
    Email?: string
    Phone?: { code: string, phone: string }
    IsPhone: boolean | string
    Password: string
    ConfirmPassword: string,
    IsConfirmed?: boolean,
}

export type tSocials = 'vk' | 'ok' | 'google'

export interface iCodes {
    [country: string]: [string, string]
}
