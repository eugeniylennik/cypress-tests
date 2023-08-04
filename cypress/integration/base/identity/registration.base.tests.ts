import { visitIdentityPage } from '../../../pages/tools'
import { CountryCode, LoginLoc, RecoveryLoc, RegistrationLoc, UserAgreement } from '../../../utils/localization'
import { getDomain } from '@data/domains'
import RegistrationPage from '../../../pages/identity/registration/Registration'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as faker from 'faker/locale/ru'
import LoginPage from '../../../pages/identity/login/Login'
import Header from '../../../pages/identity/common/Header'
import { userBodies } from '../../../utils/generate.helpers'
import { tQueryParams, tRegistration } from '../../../utils/types/identity.types'
import { clients, portalClient } from '../../../data/clients/clients'
import { onlyOn } from '@cypress/skip-test'
import { endpoints } from '@api/endpoints'

describe('Базовые тесты на форму регистрации', () => {

    const header = new Header
    const loginPage = new LoginPage
    const regPage = new RegistrationPage

    beforeEach(() => {
        visitIdentityPage(regPage.pageUrlSuffix)
    })

    context('Шапка', () => {
        it('Кнопка "Назад"', () => {
            header.btnBack().should('be.visible')
            header.txtBtnBack().then((text) => {
                expect(text).to.eq(LoginLoc.BTN_BACK)
            })
        })

        context('Портал', () => {
            beforeEach(() => {
                header.goBack()
            })
            it('Открылась главная страница', () => {
                cy.location().should((location) => {
                    expect(location.href).to.eq(`${getDomain('web')}/`)
                    expect(location.pathname).be.eq('/')
                })
            })
        })

        it('Логотип', () => {
            header.getLogo().should('be.visible')
        })
    })

    context('Форма регистрации', () => {

        it('Тайтл', () => {
            regPage.form.title().invoke('text').then((text) => {
                expect(text).to.eq(RegistrationLoc.TITLE)
            })
            regPage.form.title().should('have.css', 'text-align', 'center')
                .should('have.css', 'font-weight', '700')
                .should('have.css', 'color', 'rgb(42, 38, 38)')
        })

        context('Поле Фамилия', () => {
            it('Инпут', () => {
                regPage.form.lastName.input().should('be.visible')
                regPage.form.lastName.label().invoke('text').then((label) => {
                    expect(label).to.eq(RegistrationLoc.LASTNAME)
                })
            })
            context('Фокусировка', () => {
                beforeEach(() => {
                    regPage.form.lastName.input().wait(1000).click()
                })
                it('Плэйсхолдер', () => {
                    regPage.form.lastName.label()
                        .should('have.attr', 'style', 'top: 6px; font-size: 14px; font-weight: 400;')
                })
                context('Дефокусировка', () => {
                    beforeEach(() => {
                        regPage.form.firstName.input().wait(1000).click()
                    })
                    it('Плэйсхолдер', () => {
                        regPage.form.lastName.label()
                            .should('have.attr', 'style', 'top: 25px; font-size: 18px; font-weight: 400;')
                    })
                })
            })
            context('Ввод значений', () => {
                const lastName = faker.name.lastName()
                beforeEach(() => {
                    regPage.form.lastName.setValue(lastName)
                })
                it('Значение', () => {
                    regPage.form.lastName.input().should('have.value', lastName)
                })
                context('Очистка значения', () => {
                    beforeEach(() => {
                        regPage.form.lastName.clearInput()
                    })
                    it('Значение', () => {
                        regPage.form.lastName.input().should('have.value', '')
                    })
                })
            })
        })
        context('Поле Имя', () => {
            it('Инпут', () => {
                regPage.form.firstName.input().should('be.visible')
                regPage.form.firstName.label().invoke('text').then((label) => {
                    expect(label).to.eq(RegistrationLoc.FIRSTNAME)
                })
            })
            context('Фокусировка', () => {
                beforeEach(() => {
                    regPage.form.firstName.input().wait(1000).click()
                })
                it('Плэйсхолдер', () => {
                    regPage.form.firstName.label()
                        .should('have.attr',
                            'style',
                            'top: 6px; font-size: 14px; font-weight: 400;'
                        )
                })
                context('Дефокусировка', () => {
                    beforeEach(() => {
                        regPage.form.lastName.input().wait(1000).click()
                    })
                    it('Плэйсхолдер', () => {
                        regPage.form.firstName.label()
                            .should('have.attr',
                                'style',
                                'top: 25px; font-size: 18px; font-weight: 400;'
                            )
                    })
                })
            })
            context('Ввод значений', () => {
                const firstName = faker.name.lastName()
                beforeEach(() => {
                    regPage.form.firstName.setValue(firstName)
                })
                it('Значение', () => {
                    regPage.form.firstName.input().should('have.value', firstName)
                })
                context('Очистка значения', () => {
                    beforeEach(() => {
                        regPage.form.firstName.clearInput()
                    })
                    it('Значение', () => {
                        regPage.form.firstName.input().should('have.value', '')
                    })
                })
            })
        })
        context('Поле Отчество/Нет отчества', () => {
            it('Инпут', () => {
                regPage.form.patronymic.input().should('be.visible')
                regPage.form.patronymic.label().invoke('text').then((label) => {
                    expect(label).to.eq(RegistrationLoc.PATRONYMIC)
                })
            })
            context('Фокусировка', () => {
                beforeEach(() => {
                    regPage.form.patronymic.input().wait(1000).click()
                })
                it('Плэйсхолдер', () => {
                    regPage.form.patronymic.label()
                        .should('have.attr',
                            'style',
                            'top: 6px; font-size: 14px; font-weight: 400;'
                        )
                })
                context('Дефокусировка', () => {
                    beforeEach(() => {
                        regPage.form.lastName.input().wait(1000).click()
                    })
                    it('Плэйсхолдер', () => {
                        regPage.form.patronymic.label()
                            .should('have.attr',
                                'style',
                                'top: 25px; font-size: 18px; font-weight: 400;'
                            )
                    })
                })
            })
            context('Ввод значений', () => {
                const patronymic = faker.name.lastName()
                beforeEach(() => {
                    regPage.form.patronymic.setValue(patronymic)
                })
                it('Значение', () => {
                    regPage.form.patronymic.input().should('have.value', patronymic)
                })
                context('Очистка значения', () => {
                    beforeEach(() => {
                        regPage.form.patronymic.clearInput()
                    })
                    it('Значение', () => {
                        regPage.form.patronymic.input().should('have.value', '')
                    })
                })
            })
            context('Нет отчества', () => {
                it('Инпут', () => {
                    regPage.form.noPatronymic.input().should('be.visible')
                    regPage.form.noPatronymic.label().invoke('text').then((label) => {
                        expect(label).to.eq(RegistrationLoc.NO_PATRONYMIC)
                    })
                })
                it('По-умолчанию unchecked', () => {
                    regPage.form.noPatronymic.input().should('not.be.checked')
                })
                context('Активация', () => {
                    beforeEach(() => {
                        regPage.form.patronymic.setValue('TEST')
                        regPage.form.noPatronymic.check()
                    })
                    it('Checked', () => {
                        regPage.form.noPatronymic.input().should('be.checked')
                    })
                    it('Поле Отчество пустое и задизейблено', () => {
                        regPage.form.patronymic.input().should('have.value', '')
                        regPage.form.patronymic.container().should('have.class', 'disabled')
                    })
                    context('Деактивация', () => {
                        beforeEach(() => {
                            regPage.form.noPatronymic.uncheck()
                        })
                        it('Поле Отчество активно', () => {
                            regPage.form.patronymic.setValue('TEST').should('have.value', 'TEST')
                            regPage.form.noPatronymic.input().should('not.be.checked')
                        })
                    })
                })
            })
        })
        context('Поле Город проживания', () => {
            it('Инпут', () => {
                regPage.form.city.input().should('be.visible')
                regPage.form.city.label().invoke('text').then((label) => {
                    expect(label).to.eq(RegistrationLoc.CITY)
                })
            })
            context('Фокусировка', () => {
                beforeEach(() => {
                    regPage.form.city.input().wait(1000).click()
                })
                it('Плэйсхолдер', () => {
                    regPage.form.city.label()
                        .should('have.attr',
                            'style',
                            'top: 6px; font-size: 14px; font-weight: 400;'
                        )
                })
                context('Дефокусировка', () => {
                    beforeEach(() => {
                        regPage.form.lastName.input().wait(1000).click()
                    })
                    it('Плэйсхолдер', () => {
                        regPage.form.city.label()
                            .should('have.attr',
                                'style',
                                'top: 25px; font-size: 18px; font-weight: 400;'
                            )
                    })
                })
            })
            context('Ввод значений', () => {
                const city = 'Россия, г Москва'
                beforeEach(() => {
                    regPage.form.city.setValue(city)
                })
                it('Значение', () => {
                    regPage.form.city.input().should('have.value', city)
                    regPage.form.city.list.items().first().should('have.text', city)
                })
                context('Очистка значения', () => {
                    beforeEach(() => {
                        regPage.form.city.clearInput()
                    })
                    it('Значение', () => {
                        regPage.form.city.input().should('have.value', '')
                    })
                })
            })
        })
        context('Поле Дата Рождения', () => {
            it('Инпут', () => {
                regPage.form.birthday.container().should('be.visible')
                regPage.form.birthday.label().invoke('text').then((label) => {
                    expect(label).to.eq(RegistrationLoc.BIRTHDAY)
                })
            })
            it('Поле День', () => {
                regPage.form.birthday.day.block().should('be.visible')
                regPage.form.birthday.day.label().invoke('text').then((label) => {
                    expect(label).to.eq(RegistrationLoc.DAY)
                })
            })
            it('Поле Месяц', () => {
                regPage.form.birthday.month.block().should('be.visible')
                regPage.form.birthday.month.label().invoke('text').then((label) => {
                    expect(label).to.eq(RegistrationLoc.MONTH)
                })
            })
            it('Поле Год', () => {
                regPage.form.birthday.year.block().should('be.visible')
                regPage.form.birthday.year.label().invoke('text').then((label) => {
                    expect(label).to.eq(RegistrationLoc.YEAR)
                })
            })
            context('Ввод значений', () => {
                beforeEach(() => {
                    regPage.form.birthday.setValue({SelectedDate: 25, SelectedMonth: 'сентябрь', SelectedYear: 1993})
                })
                it('Значение', () => {
                    regPage.form.birthday.day.select().should('have.value', 25)
                    regPage.form.birthday.month.select().should('have.value', 9)
                    regPage.form.birthday.year.select().should('have.value', 1993)
                })
            })
        })
        context('Поле Email/Телефон', () => {
            context('Email', () => {
                it('Радиобаттон', () => {
                    regPage.form.email.radioBtn().should('be.visible')
                    regPage.form.email.label().invoke('text').then((label) => {
                        expect(label).to.eq(RegistrationLoc.EMAIL)
                    })
                })
                it('По-умолчанию checked', () => {
                    regPage.form.email.inputRadioBtn().should('be.checked')
                })
                it('По умолчанию поле Email not display:none', () => {
                    regPage.form.email.input().should('not.have.attr', 'style', 'display: none;')
                })
                context('Ввод значений', () => {
                    const email = faker.internet.email()
                    beforeEach(() => {
                        regPage.form.email.setValue(email)
                    })
                    it('Значение', () => {
                        regPage.form.email.input().should('have.value', email)
                    })
                    context('Очистка значения', () => {
                        beforeEach(() => {
                            regPage.form.email.clear()
                        })
                        it('Значение', () => {
                            regPage.form.email.input().should('have.value', '')
                        })
                    })
                })
            })
            context('Телефон', () => {
                it('Радиобаттон', () => {
                    regPage.form.phone.radioBtn().should('be.visible')
                    regPage.form.phone.label().invoke('text').then((label) => {
                        expect(label).to.eq(RegistrationLoc.PHONE)
                    })
                })
                it('По-умолчанию unchecked', () => {
                    regPage.form.phone.inputRadioBtn().should('not.be.checked')
                })
                it('По умолчанию поле Phone display:none', () => {
                    regPage.form.phone.container().should('have.attr', 'style', 'display: none;')
                })
                context('Ввод значений', () => {
                    beforeEach(() => {
                        regPage.form.phone.inputRadioBtn().click()
                    })
                    it('По-умолчанию код страны Россия', () => {
                        regPage.form.phone.country.selectedFlag().should('have.attr', 'title', CountryCode.RU)
                        regPage.form.phone.country.selectedCode().should('have.text', '+7')
                    })
                    context('Выбор другой страны по countryCode', () => {
                        beforeEach(() => {
                            regPage.form.phone.country.findByCountryCode('kz')
                        })
                        it('Код страны Казахстан', () => {
                            regPage.form.phone.country.selectedFlag().should('have.attr', 'title', CountryCode.KZ)
                            regPage.form.phone.country.selectedCode().should('have.text', '+7')
                        })
                    })
                    context('Выбор другой страны по dialCode', () => {
                        beforeEach(() => {
                            regPage.form.phone.country.findByDialCode('375')
                        })
                        it('Код страны Беларусь', () => {
                            regPage.form.phone.country.selectedFlag().should('have.attr', 'title', CountryCode.BY)
                            regPage.form.phone.country.selectedCode().should('have.text', '+375')
                        })
                    })
                    context('Поле Phone', () => {
                        const phone = '9991234567'
                        beforeEach(() => {
                            regPage.form.phone.setValue(phone)
                        })
                        it('Значение', () => {
                            regPage.form.phone.input().should('have.value', phone)
                        })
                        context('Очистка значения', () => {
                            beforeEach(() => {
                                regPage.form.phone.clear()
                            })
                            it('Значение', () => {
                                regPage.form.phone.input().should('have.value', '')
                            })
                        })
                    })
                })
            })
        })
        context('Поле Пароль/Повторите пароль', () => {
            context('Поле Пароль', () => {
                it('Инпут', () => {
                    regPage.form.password.input().should('be.visible')
                    regPage.form.password.label().invoke('text').then((label) => {
                        expect(label).to.eq(RegistrationLoc.PASSWORD)
                    })
                })
                it('Кнопка видимости пароля', () => {
                    regPage.form.password.btnShowPass().should('be.visible')
                })
                context('Фокусировка', () => {
                    beforeEach(() => {
                        regPage.form.password.input().wait(1000).click()
                    })
                    it('Плэйсхолдер', () => {
                        regPage.form.password.label()
                            .should('have.attr',
                                'style',
                                'top: 6px; font-size: 14px; font-weight: 400;'
                            )
                    })
                    context('Дефокусировка', () => {
                        beforeEach(() => {
                            regPage.form.lastName.input().wait(1000).click()
                        })
                        it('Плэйсхолдер', () => {
                            regPage.form.password.label()
                                .should('have.attr',
                                    'style',
                                    'top: 25px; font-size: 18px; font-weight: 400;'
                                )
                        })
                    })
                })
                context('Ввод значений', () => {
                    const password = '123456'
                    beforeEach(() => {
                        regPage.form.password.setValue(password)
                    })
                    it('Значение', () => {
                        regPage.form.password.input().should('have.value', password)
                        regPage.form.password.input().should('have.attr', 'type', 'password')
                    })
                    it('Инфо хинт', () => {
                        regPage.form.password.hint().should('have.text', RegistrationLoc.PASS_HINT)
                    })
                    context('Видимость пароля', () => {
                        beforeEach(() => {
                            regPage.form.password.btnShowPass().click()
                        })
                        it('Пароль виден', () => {
                            regPage.form.password.input().should('have.attr', 'type', 'text')
                        })
                    })
                    context('Очистка значения', () => {
                        beforeEach(() => {
                            regPage.form.password.clearInput()
                        })
                        it('Значение', () => {
                            regPage.form.password.input().should('have.value', '')
                        })
                    })
                })
            })
            context('Поле Повторите пароль', () => {
                it('Инпут', () => {
                    regPage.form.confirmPass.input().should('be.visible')
                    regPage.form.confirmPass.label().invoke('text').then((label) => {
                        expect(label).to.eq(RegistrationLoc.CONFIRM_PASSWORD)
                    })
                })
                it('Кнопка видимости пароля', () => {
                    regPage.form.confirmPass.btnShowPass().should('be.visible')
                })
                context('Фокусировка', () => {
                    beforeEach(() => {
                        regPage.form.confirmPass.input().wait(1000).click()
                    })
                    it('Плэйсхолдер', () => {
                        regPage.form.confirmPass.label()
                            .should('have.attr',
                                'style',
                                'top: 6px; font-size: 14px; font-weight: 400;'
                            )
                    })
                    context('Дефокусировка', () => {
                        beforeEach(() => {
                            regPage.form.lastName.input().wait(1000).click()
                        })
                        it('Плэйсхолдер', () => {
                            regPage.form.confirmPass.label()
                                .should('have.attr',
                                    'style',
                                    'top: 25px; font-size: 18px; font-weight: 400;'
                                )
                        })
                    })
                })
                context('Ввод значений', () => {
                    const password = '123456'
                    beforeEach(() => {
                        regPage.form.confirmPass.setValue(password)
                    })
                    it('Значение', () => {
                        regPage.form.confirmPass.input().should('have.value', password)
                        regPage.form.confirmPass.input().should('have.attr', 'type', 'password')
                    })
                    context('Видимость пароля', () => {
                        beforeEach(() => {
                            regPage.form.confirmPass.btnShowPass().click()
                        })
                        it('Пароль виден', () => {
                            regPage.form.confirmPass.input().should('have.attr', 'type', 'text')
                        })
                    })
                    context('Очистка значения', () => {
                        beforeEach(() => {
                            regPage.form.confirmPass.clearInput()
                        })
                        it('Значение', () => {
                            regPage.form.confirmPass.input().should('have.value', '')
                        })
                    })
                })
            })
        })
        context('Кнопка Зарегистрироваться', () => {
            it('Кнопка', () => {
                regPage.form.btnSubmit.get().should('be.visible')
                regPage.form.btnSubmit.text().then((text) => {
                    expect(text).to.eq(RegistrationLoc.BTN_SUBMIT)
                })
            })
        })
        context('Чекбокс и соглашение', () => {
            context('Чекбокс', () => {
                it('Чекбокс по-умолчанию', () => {
                    regPage.form.agree.checkbox.get().should('not.be.checked')
                })
                context('Активировать', () => {
                    beforeEach(() => {
                        regPage.form.agree.checkbox.get().check()
                    })
                    it('Активирован', () => {
                        regPage.form.agree.checkbox.get().should('be.checked')
                    })
                })
            })
            context('Соглашение', () => {
                it('Пользовательское', () => {
                    regPage.form.agree.text.linkAgreement().should('be.visible')
                    regPage.form.agree.text.linkAgreement().should('have.attr', 'href', UserAgreement.AGREEMENT)
                })
                it('Политическое', () => {
                    regPage.form.agree.text.linkPolitic().should('be.visible')
                    regPage.form.agree.text.linkPolitic().should('have.attr', 'href', UserAgreement.POLITIC)
                })
            })
        })
    })

    context('Футер', () => {
        it('Соц. сети', () => {
            regPage.footer.socialNetworks.ok().should('be.visible')
            regPage.footer.socialNetworks.vk().should('be.visible')
            regPage.footer.socialNetworks.google().should('be.visible')
        })
        context('Авторизоваться', () => {
            beforeEach(() => {
                regPage.footer.btnLogin().click()
            })
            it('Форма авторизации', () => {
                loginPage.form.container().should('be.visible')
            })
        })
    })
})

describe('Базовые тесты на форму подтверждения регистрации', () => {

    const regPage = new RegistrationPage

    context('Phone', () => {
        const client: tQueryParams = clients(portalClient)
        let user: tRegistration

        onlyOn(Cypress.env('IS_PHONE_ENABLED'), () => {
            context('Форма подтверждения регистрации', () => {
                beforeEach(function () {
                    user = userBodies.defaultUserPhoneBody()
                    cy.registration(client, user, {
                        isConfirmationNeeded: false
                    }).get('@location').then((confirmForm) => {
                        cy.visit(String(confirmForm))
                    })
                    cy.fixture('verificationCodeService.json').then((json) => {
                        this.data = json
                        this.data.MaxPhoneCallAttemptCount--
                    })
                })
                it('Пользователь видит форму подтверждения регистрации по звонку', function () {
                    regPage.confirm.container().should('be.visible')
                    regPage.confirm.title().invoke('text')
                        .then((text) => {
                            expect(text).to.eq(RegistrationLoc.CONFIRM_REG)
                        })
                    regPage.confirm.message().invoke('text')
                        .then((text) => {
                            expect(text).to.eq(RegistrationLoc.CONFIRM_PHONE_MESSAGE)
                        })
                    regPage.confirm.email().invoke('text')
                        .then((text) => {
                            expect(text).to.eq(`${user.Phone?.code}${user.Phone?.phone}`)
                        })
                })
                it('Таймер повторной отправки кода', function () {
                    regPage.confirm.form.count().should('be.visible')
                    regPage.confirm.form.countDown().invoke('text').then((text) => {
                        expect(text).to.eq(RegistrationLoc.REPEAT_MESSAGE(this.data.RepeatInterval))
                    })
                })
                context('Нажимает на кнопку Отменить', () => {
                    beforeEach(() => {
                        regPage.confirm.btnCancel().click()
                    })
                    it('Открывается страница с формой авторизации', () => {
                        new LoginPage().form.loginForm().should('be.visible')
                    })
                    it.skip('Сохраняются query params', () => {
                        cy.get('@regFormResponse').then((query) => {
                            cy.location().should((location) => {
                                expect(location.href).to.eq(
                                    endpoints.identity.redirection.login(String(query))
                                )
                            })
                        })
                    })
                })
                context('Отправить запрос на повторный звонок', () => {
                    beforeEach(function () {
                        cy.wait(this.data.RepeatInterval * 1000)
                    })
                    it('Кнопка отправить запрос повторно - активна', () => {
                        regPage.confirm.form.countDown()
                            .should('have.attr', 'style', 'display: none;')
                        regPage.confirm.form.btnCodeRepeat()
                            .should('have.attr', 'style', '')
                            .invoke('text').then((text) => {
                                expect(text).to.eq(RecoveryLoc.REPEAT)
                            })
                    })
                    context('Нажимает на отправить запрос на звонок', () => {
                        beforeEach(function () {
                            regPage.confirm.form.btnCodeRepeat().click()
                            this.data.MaxPhoneCallAttemptCount--
                        })
                        it('Пользователь видит форму подтверждения регистрации по звонку', () => {
                            regPage.confirm.container().should('be.visible')
                            regPage.confirm.title().invoke('text')
                                .then((text) => {
                                    expect(text).to.eq(RegistrationLoc.CONFIRM_REG)
                                })
                            regPage.confirm.message().invoke('text')
                                .then((text) => {
                                    expect(text).to.eq(RegistrationLoc.CONFIRM_PHONE_MESSAGE)
                                })
                            regPage.confirm.email().invoke('text')
                                .then((text) => {
                                    expect(text).to.eq(`${user.Phone?.code}${user.Phone?.phone}`)
                                })
                        })
                        it('Кнопка отправить повторно отсутствует, отображается таймер', function () {
                            regPage.confirm.form.btnCodeRepeat().should('not.exist')
                            regPage.confirm.form.count().should('be.visible')
                            regPage.confirm.form.countDown().invoke('text').then((text) => {
                                expect(this.data.MaxPhoneCallAttemptCount).to.eq(0)
                                expect(text).to.eq(RegistrationLoc.REPEAT_MESSAGE(this.data.RepeatInterval))
                            })
                        })
                        context('Подтверждение регистрации по смс', () => {
                            beforeEach(function () {
                                cy.wait(this.data.RepeatInterval * 1000)
                                regPage.confirm.form.btnCodeRepeat().click()
                            })
                            it('Пользователь видит форму подтверждения регистрации по смс', () => {
                                regPage.confirm.container().should('be.visible')
                                regPage.confirm.title().invoke('text')
                                    .then((text) => {
                                        expect(text).to.eq(RegistrationLoc.CONFIRM_REG)
                                    })
                                regPage.confirm.message().invoke('text')
                                    .then((text) => {
                                        expect(text).to.match(RegistrationLoc.CONFIRM_SMS_MESSAGE)
                                    })
                                regPage.confirm.email().invoke('text')
                                    .then((text) => {
                                        expect(text).to.eq(`${user.Phone?.code}${user.Phone?.phone}`)
                                    })
                            })
                        })
                    })
                })
            })
            context('Лимиты и блокировка отправки запросов', () => {
                context('Лимиты отправки запросов на повторный звонок', () => {
                    beforeEach(function () {
                        user = userBodies.defaultUserPhoneBody()
                        const phone = `${user.Phone?.code}${user.Phone?.phone}`
                        cy.fixture('verificationCodeService.json').then((json) => {
                            this.data = json
                        })
                        cy.registration(client, user, {
                            isConfirmationNeeded: false
                        }).get('@location').then((confirmForm) => {
                            cy.repeatCode(client, phone, this.data.MaxPhoneCallAttemptCount+1)
                            cy.visit(String(confirmForm))
                        })
                    })
                    it('Форма подтверждения регистрации по смс', function () {
                        regPage.confirm.container().should('be.visible')
                        regPage.confirm.title().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(RegistrationLoc.CONFIRM_REG)
                            })
                        regPage.confirm.message().invoke('text')
                            .then((text) => {
                                expect(text).to.match(RegistrationLoc.CONFIRM_SMS_MESSAGE)
                            })
                        regPage.confirm.email().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(`${user.Phone?.code}${user.Phone?.phone}`)
                            })
                    })
                })
                context('Блокировка лимитов повторного запроса', () => {
                    beforeEach(function () {
                        user = userBodies.defaultUserPhoneBody()
                        const phone = `${user.Phone?.code}${user.Phone?.phone}`
                        cy.fixture('verificationCodeService.json').then((json) => {
                            this.data = json
                        })
                        cy.registration(client, user, {
                            isConfirmationNeeded: false
                        }).get('@location').then((confirmForm) => {
                            cy.repeatCode(client, phone, (this.data.MaxPhoneCallAttemptCount+
                                this.data.MaxPhoneSmsAttemptCount)+1)
                            cy.visit(String(confirmForm))
                        })
                    })
                    it('Форма блокировки', function () {
                        regPage.confirm.container().should('be.visible')
                        regPage.confirm.title().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(RegistrationLoc.CONFIRM_REG)
                            })
                        regPage.confirm.message().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(RegistrationLoc.BLOCK_MESSAGE)
                            })
                        regPage.confirm.form.input().should('have.attr', 'disabled')
                        regPage.confirm.form.btnCodeRepeat().should('not.exist')
                        regPage.confirm.form.btnSubmit().should('have.attr', 'disabled')
                    })
                })
            })
        })
    })
})
