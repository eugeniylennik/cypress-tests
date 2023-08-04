import { tRole } from './roles'

const credits: tRole = {
    admin: {
        Email: 'admin@rsv.ru',
        Password: '123456',
        Roles: ['ROLE_ADMIN', 'ROLE_USER'],
        Phone: '+70000000003'
    },
    user: {
        Email: 'user@rsv.ru',
        Password: '123456',
        Roles: ['ROLE_USER']
    },
    admin_leader: {
        Email: '',
        Password: '',
        Roles: ['ROLE_LEADERS_ADMIN']
    },
    admin_projects: {
        Email: '',
        Password: '',
        Roles: ['ROLE_PROJECT_ADMIN']
    },
    curator: {
        Email: 'curator@rsv.ru',
        Password: '123456',
        Roles: ['ROLE_CURATOR', 'ROLE_USER']
    },
    expert: {
        Email: '',
        Password: '',
        Roles: ['ROLE_EXPERT']
    },
    admin_clubs: {
        Email: '',
        Password: '',
        Roles: ['ROLE_CLUBS_ADMIN']
    },
    head_office_manager: {
        Email: '',
        Password: '',
        Roles: ['ROLE_HEAD_OFFICE_MANAGER']
    },
    admin_press: {
        Email: '',
        Password: '',
        Roles: ['ROLE_PRESS_ADMIN']
    },
    admin_projects_read_only: {
        Email: '',
        Password: '',
        Roles: ['ROLE_PROJECT_ADMIN_READ_ONLY']
    }
}

export default credits
