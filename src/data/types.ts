export type tEnvironment
    = 'test'
    | 'test-2'
    | 'dev'
    | 'dev-2'
    | 'demo'
    | 'stage'
    | 'prod'
    | 'localhost'

export type tRoles
    = 'ROLE_USER'
    | 'ROLE_ADMIN'
    | 'ROLE_LEADERS_ADMIN'
    | 'ROLE_CURATOR'
    | 'ROLE_EXPERT'
    | 'ROLE_CLUBS_ADMIN'
    | 'ROLE_PROJECT_ADMIN'
    | 'ROLE_PRESS_ADMIN'
    | 'ROLE_HEAD_OFFICE_MANAGER'
    | 'ROLE_PROJECT_ADMIN_READ_ONLY'
    | 'ROLE_EDUCATION_ADMIN'
    | 'ROLE_USER_ADMIN_READ_ONLY'

export type tAccessRole
    = 'ROLE_WINNER'
    | 'ROLE_FINALIST'
    | 'ROLE_FINALIST_MEMBER'
    | 'ROLE_SEMIFINALIST'
    | 'ROLE_SEMIFINALIST_MEMBER'
    | 'ROLE_PARTICIPANT'
    | 'ROLE_PARTICIPANT_MEMBER'

export type tUserCredits = {
    Email?: string
    Password: string
    Roles?: tRoles[],
    Phone?: string
}

export type tResponse<T> = {
    status: 'success' | 'error'
    message: string | null,
    data: T
}

export type tDadata = 'address' | 'country'
