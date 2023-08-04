import { generateTimeSuffix } from '../../../helpers/generate.helpers'
import * as faker from 'faker'
import { iNews } from '../../../api/rsv-cms/news/news.types'

export const newsBodies: bodies = {
    defaultPublicNewsBody: () => ({
        title: generateTimeSuffix('News'),
        hashtags: [faker.lorem.words(10)],
        text: faker.lorem.words(10),
        isDraft: false,
        isPublic: true,
        preview: faker.image.abstract()
    }),
    draftNewsBody: () => ({
        title: generateTimeSuffix('News'),
        hashtags: [faker.lorem.words(10)],
        text: faker.lorem.words(10),
        isDraft: true,
        isPublic: false,
        preview: faker.image.abstract()
    })
}
type bodies = {
    defaultPublicNewsBody: () => iNews,
    draftNewsBody: () => iNews
}
