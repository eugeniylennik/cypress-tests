export interface iClub {
    name: string
    mission?: string | null
    aim?: string | null
    worth?: string | null
    email?: string | null
    tel?: string | null
    socialOk?: string | null
    socialVk?: string | null
    socialFb?: string | null
    socialInst?: string | null
    socialYt?: string | null
    newUserPreModeration?: NewUserPreModeration
    adThemeCatalog?: string | null
    seasonCatalog?: string | null
    defaultSeason?: string | null
    generalChatId?: string | null
    chatAdminId?: number | null
    portfolioSettings: tPortfolioSettings
    results: tResultsClub
    mobileAppName?: string | null
}

export type NewUserPreModeration =
    'deny' |
    'whitelist_deny' |
    'whitelist_request' |
    'access'

export type tPortfolioSettings = {
    enabled: boolean				//Отображать раздел в приложении
    likeRequestEnabled: boolean		//Возможность голосовать/просматривать лайки у заявок в портфеле проектов
    likeRequestStopped: boolean		//Голосование остановлено
    createRequestEnabled: boolean	//Возможность подавать (создавать) заявки в портфель проектов
}

export type tResultsClub = {
    membersCount: string
    successfulProjects: string
    participantCount: string
    meetingsCount: string
    educationProgramsCount: string
    coverageRegionsCount: string
    projectsRequestsCount: string
}

export interface iClubMembers {
    club: number
    userId: number
    isHidden?: boolean
    isClubMember?: boolean
    hobby?: string[] | null
}
