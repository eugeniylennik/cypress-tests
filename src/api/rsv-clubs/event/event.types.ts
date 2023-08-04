import { tMaterials } from '../project/project.types'
import { tAccessRole } from '@data/types'

export interface iClubEvent {
    club: number					//Идентификатор клуба
    isDraft?: boolean				//Флаг черновика (по-умолчанию - false)
    allowRegistration?: boolean		//Флаг доступности регистрации на мероприятие (по-умолчанию - false)
    newUserPreModeration?: boolean	//Флаг премодерации заявок участников (по-умолчанию - false)
    title: string
    type: 'online' | 'offline'
    status: 'not_started' | 'preparing' | 'realization' | 'finished'
    date?: string | null			//Дата проведения мероприятия
    program?: string | null			//Программа мероприятия
    address?: string | null
    phone?: string | null
    contactPerson?: string | null
    materials?: tMaterials[]
    link?: string | null			//Ссылка мероприятия
    feedbackUrl?: string | null		//Ссылка на форму обратной связи
    pollUrl?: string | null			//Ссылка на форму опроса
    photoUrl?: string | null		//Ссылка на медиа
    accessRoles?: tAccessRole[] | null
}

export interface iClubEventData extends iClubEvent {
    id: number
    createdAt: string
    isArchive: boolean
    chatId: string
}

export type tClubEventResponse = {
    event: iClubEventData
}
