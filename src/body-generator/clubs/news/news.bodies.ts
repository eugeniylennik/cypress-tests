import { generateTimeSuffix } from '@helpers/generate.helpers'
import * as faker from 'faker'
import dateHelper from '../../../helpers/date'
import { iClubNews } from '../../../api/rsv-clubs/news/news.types'

export const clubNewsBodies: bodies = {
    defaultClubNewsBody:(clubId: number) => ({
        club: clubId,
        isDraft: true,
        title: generateTimeSuffix('news'),
        image: 'https://pbs.twimg.com/profile_images/1108430392267280389/ufmFwzIn.png', //TODO: upload
        //image: faker.image.avatar(),
        text: faker.lorem.paragraph(),
        dateFrom: dateHelper.getDateTimeISO(),
        hashtags: ['news', 'auto', 'body']
    })
}

type bodies = {
	defaultClubNewsBody:(clubId: number) => iClubNews
}
