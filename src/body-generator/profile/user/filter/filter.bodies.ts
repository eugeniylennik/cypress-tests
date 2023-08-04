import { tFilters } from '../../../../api/rsv-profile/user/user.types'

export const filterBodies: bodies = {
    defaultUserFilterByEmail: (email: string) => ({
        fields: ['userId'],
        filters: [
            { name:'search', value: email },
            { name: 'showDeleted', value: true}
        ]
    }),
    defaultUserFilterByPhone: (phone: string) => ({
        fields: ['userId'],
        filters: [
            { name:'regTel', value: phone },
            { name: 'showDeleted', value: true}
        ]
    })
}

type bodies = {
    defaultUserFilterByEmail: (email: string) => tFilters
    defaultUserFilterByPhone: (phone: string) => tFilters
}
