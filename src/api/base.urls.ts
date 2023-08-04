import { getDomain } from '@data/domains'

const domain = getDomain()

const baseUrls = {
    profile: {
        url: `https://profile.${domain}`
    },
    projects: {
        url: `https://projects.${domain}`
    },
    data: {
        url: `https://data.${domain}`
    },
    dadata: {
        url: `https://dadata.${domain}`
    },
    progress: {
        url: `https://progress.${domain}`
    },
    auth: {
        url: `https://auth.${domain}`
    },
    authorization: {
        url : `https://authorization.${domain}`
    },
    event: {
        url: `https://event.${domain}`
    },
    notifications: {
        url: `https://notifications.${domain}`
    },
    search: {
        url: `https://search.${domain}`
    },
    clubs: {
        url: `https://clubs.${domain}`
    },
    cms: {
        url: `https://cms.${domain}`
    },
    parser: {
        url: `https://parser.${domain}`
    },
    identity: {
        url: `https://identity.${domain}`
    }
}

export default baseUrls
