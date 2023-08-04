export interface iClubNews {
    club: number
    isDraft?: boolean
    title: string
    image?: string | null
    text: string
    dateFrom?: string | null
    authorId?: number | null		//по-умолчанию текущий пользователь
    hashtags?: string[] | null		//список тэгов размер массива - 50. Максимальная длина каждой строки - 100
}

export type tClubNewsResponse = {
    news: iClubNewsData
}

export interface iClubNewsData extends iClubNews {
    id: number,
    createdAt: string
}
