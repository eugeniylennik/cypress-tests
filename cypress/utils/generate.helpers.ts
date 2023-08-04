import { tRegistration } from './types/identity.types'
import * as fakerRu from 'faker/locale/ru'
import * as fakerEn from 'faker/locale/en'
import { generatePhoneNumber } from '@helpers/generate.helpers'

export const userBodies = {
    defaultUserEmailBody: (): tRegistration => ({
        LastName: fakerRu.name.lastName(),
        FirstName: fakerRu.name.findName('')
            .split(' ', 1)[0],
        Patronymic: fakerRu.name.findName('')
            .split(' ', 2)[1],
        NoPatronymic: false,
        City: 'Россия, г Москва',
        SelectedDate: 25,
        SelectedMonth: 9,
        SelectedYear: 1993,
        Email: fakerEn.internet.email(
            fakerEn.name.lastName(), fakerEn.name.firstName()
        ).toLowerCase(),
        IsPhone: 'False',
        Password: '123456Qwerty',
        ConfirmPassword: '123456Qwerty',
        IsConfirmed: true
    }),
    defaultUserPhoneBody: (): tRegistration => ({
        LastName: fakerRu.name.lastName(),
        FirstName: fakerRu.name.findName('')
            .split(' ', 1)[0],
        Patronymic: fakerRu.name.findName('')
            .split(' ', 2)[1],
        NoPatronymic: false,
        City: 'Россия, г Москва',
        SelectedDate: 25,
        SelectedMonth: 9,
        SelectedYear: 1993,
        Phone: generatePhoneNumber(),
        IsPhone: 'True',
        Password: '123456Qwerty',
        ConfirmPassword: '123456Qwerty',
        IsConfirmed: true
    }),
    userHasEmailPhoneBody: (): tRegistration => ({
        LastName: fakerRu.name.lastName(),
        FirstName: fakerRu.name.findName('')
            .split(' ', 1)[0],
        Patronymic: fakerRu.name.findName('')
            .split(' ', 2)[1],
        NoPatronymic: false,
        City: 'Россия, г Москва',
        SelectedDate: 25,
        SelectedMonth: 9,
        SelectedYear: 1993,
        Email: fakerEn.internet.email(
            fakerEn.name.lastName(), fakerEn.name.firstName()
        ).toLowerCase(),
        Phone: generatePhoneNumber(),
        IsPhone: 'True',
        Password: '123456Qwerty',
        ConfirmPassword: '123456Qwerty',
        IsConfirmed: true
    })
}
