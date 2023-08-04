import * as fakerRu from 'faker/locale/ru'
import * as fakerEn from 'faker/locale/en'
import { generateRandomInt, generateTimeSuffix } from '@helpers/generate.helpers'
import dateTime from '@helpers/date'
import { tUserInfo } from '../../../api/rsv-profile/user/user.types'

export const userBodies: bodies = {
    defaultUserInfoMainBody: () => ({
        name: fakerRu.name.findName('')
            .split(' ', 1)[0],
        surname: fakerRu.name.lastName(),
        patronymic: fakerRu.name.findName('')
            .split(' ', 2)[1],
        dateOfBirth: dateTime.getDateFormat({year:1990}),
        gender: false,
        about: fakerRu.lorem.paragraph()
    }),
    defaultUserContactsInfoBody: () => ({
        email: fakerEn.internet.email(),
        fb: 'https://facebook.com/id123',
        instagram: 'https://instagram.com/id123',
        isPlaceOfBirthSpecial: false,
        ok: 'https://ok.ru/id123',
        tel: '+79991234567',
        vk: 'https://vk.com/id123',
        yt: 'https://youtube.com/channel/UC1Xgf7skTST1T-3cmJGq_Vw'
    }),
    defaultOtherInfoBody: () => ({
        children: generateRandomInt(10),
        gosSecretFrom: dateTime.getDateFormat({year:2010}),
        gosSecretTo: dateTime.getDateFormat({year:2015}),
        isMember: true,
        isSecret: true,
        isSocial: true,
        isVolunteer: true,
        maidenSurname: generateTimeSuffix('MaidenSurname'),
        socialActivity: generateTimeSuffix('SocialActivity'),
        volunteerActivity: generateTimeSuffix('volunteerActivity'),
        warVeteran: false
    })
}

type bodies = {
    defaultUserInfoMainBody: () => tUserInfo
    defaultUserContactsInfoBody: () => tUserInfo
    defaultOtherInfoBody: () => tUserInfo
}
