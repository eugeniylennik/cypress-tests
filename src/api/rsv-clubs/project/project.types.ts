import { tAccessRole } from '@data/types'

export interface iClubProject {
    club: number						//Идентификатор клуба
    isDraft?: boolean					//Флаг черновик/опубликован
    accelerator?: boolean				//Флаг акселератора
    allowRegistration?: boolean			//Флаг доступности регистрации на проект
    newUserPreModeration?: boolean		//Флаг премодерации заявок участников
    title: string
    image?: string | null
    description?: string | null
    finishDate?: string | null
    managerId?: number | null			//Идентификатор пользователя - менеджера проекта
    kpe?: string | null
    results?: string | null
    type: 'club' | 'leader'
    category: 'social' | 'networking' | 'education' | 'infrastructure'
    status: 'not_started' | 'preparing' | 'realization' | 'finished'
    authors?: number[] | null			//Идентификатор авторов проекта
    courses?: number[] | null			//Идентификатор курсов
    pollUrl?: string | null				//Ссылка на форму опроса
    materials?: tMaterials[]
    accessRoles?: tAccessRole[] | null		//Список ролей пользователей, которые имеют доступ к проекту
    isCommentsEnabled?: boolean			//Флаг что включены комментарии
    isCommentsLikesEnabled?: boolean	//Флаг что включены лайки к комментариям
}

export type tMaterials = {
    title?: string | null
    size?: number | null
    link?: string | null
}

export type tClubProjectResponse = {
    project: iClubProjectData
}

export interface iClubProjectData extends iClubProject {
    id: number
    chatId?: string | null
    createdAt: string
}
