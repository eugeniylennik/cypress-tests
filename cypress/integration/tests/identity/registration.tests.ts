import { tQueryParams, tRegistration } from '../../../utils/types/identity.types'
import { clients, portalClient } from '../../../data/clients/clients'
import RegistrationPage from '../../../pages/identity/registration/Registration'
import { userBodies } from '../../../utils/generate.helpers'
import { getDomain } from '@data/domains'
import { convertObjectToQueryParams } from '@helpers/helpers'
import * as faker from 'faker/locale/en'
import credits from '@data/credits'
import {
    deletePersonData,
    getUserProfileById,
    getUsersByFilter,
    markAsDeleted
} from '@helpers/api-helpers/profile/user/helpers'
import { filterBodies } from '@bodyGenerator/profile/user/filter/filter.bodies'
import { AxiosInstance } from 'axios'
import { createInstance } from '@helpers/instance'
import { RegistrationLoc } from '../../../utils/localization'
import { assertCallbackAndToken, assertPhoneConfirmationPostFormData, tOptions } from '../../../pages/assertion'
import { endpoints } from '@api/endpoints'
import authStep from '@api/rsv-auth/auth.steps'

describe('Регистрация тесты', () => {

    const regPage = new RegistrationPage

    context('Форма регистрации', () => {
        let instance: AxiosInstance
        let user: tRegistration
        context('Email', () => {
            const client: tQueryParams = clients(portalClient)
            const path = convertObjectToQueryParams(client)

            beforeEach(() => {
                user = userBodies.defaultUserEmailBody()
                cy.visitRegistration(client)
                regPage.form.setValuesRegForm(user)
                regPage.form.agree.checkbox.check()
                regPage.form.btnSubmit.click()
            })

            it('Регистрация пользователя с помощью Email', () => {
                cy.wait('@postForm').then((form) => {
                    expect(form.response?.statusCode).to.eq(302)
                    const formData = new URLSearchParams(form.request.body)
                    expect(formData.get('RedirectUrl')).to.eq(client.redirect_uri)
                    expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                    expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                    expect(formData.get('LastName')).to.eq(user.LastName)
                    expect(formData.get('FirstName')).to.eq(user.FirstName)
                    expect(formData.get('Patronymic')).to.eq(user.Patronymic)
                    expect(formData.get('NoPatronymic')).to.eq(`${user.NoPatronymic}`)
                    expect(formData.get('City')).to.eq(user.City)
                    expect(formData.get('SelectedDate')).to.eq(`${user.SelectedDate}`)
                    expect(formData.get('SelectedMonth')).to.eq('9')
                    expect(formData.get('SelectedYear')).to.eq(`${user.SelectedYear}`)
                    expect(formData.get('IsPhone')).to.eq('False')
                    expect(formData.get('Email')).to.eq(user.Email)
                    expect(formData.get('Phone')).to.eq('')
                    expect(formData.get('Password')).to.eq(user.Password)
                    expect(formData.get('ConfirmPassword')).to.eq(user.ConfirmPassword)
                    expect(formData.get('NoPatronymic')).to.eq(`${user.NoPatronymic}`)
                })
                regPage.confirm.form.setValue(Cypress.env('STATIC_CODE'))
                regPage.confirm.form.clickBtnSubmit()
                cy.wait('@confirm').then((confirm) => {
                    expect(confirm.response?.statusCode).to.eq(302)
                    const formData = new URLSearchParams(confirm.request.body)
                    expect(formData.get('PhoneOrEmail')).to.eq(user.Email)
                    expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                    expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                    expect(formData.get('Phone')).to.eq('')
                    expect(formData.get('Token')).to.eq('')
                    expect(formData.get('Code')).to.eq(Cypress.env('STATIC_CODE'))
                }).wait('@callback').then((callback) => {
                    expect(callback.response?.statusCode).to.eq(302)
                    expect(callback.response?.headers['location']).to.match(RegExp(/code=[0-9,A-Z]+/g))
                }).wait('@token').then((token) => {
                    expect(token.response?.statusCode).to.eq(200)
                    expect(token.response?.body.id_token).to.match(RegExp(/e[\w\d.-]+/gi))
                    expect(token.response?.body.access_token).to.match(RegExp(/e[\w\d.-]+/gi))
                    expect(token.response?.body.expires_in).to.eq(3600)
                    expect(token.response?.body.token_type).to.eq('Bearer')
                    expect(token.response?.body.scope).to.eq(client.scope)
                })
                cy.location().should((location) => {
                    expect(location.host).to.eq(getDomain())
                    expect(location.pathname).be.eq('/')
                })
            })
        })
        context('Phone', () => {
            const client: tQueryParams = clients(portalClient)
            const path = convertObjectToQueryParams(client)

            beforeEach(() => {
                user = userBodies.defaultUserPhoneBody()
                cy.visitRegistration(client)
                regPage.form.setValuesRegForm(user)
                regPage.form.agree.checkbox.check()
                regPage.form.btnSubmit.click()
            })

            it('Регистрация пользователя с помощью Phone', () => {
                cy.wait('@postForm').then((form) => {
                    expect(form.response?.statusCode).to.eq(302)
                    const formData = new URLSearchParams(form.request.body)
                    expect(formData.get('RedirectUrl')).to.eq(client.redirect_uri)
                    expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                    expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                    expect(formData.get('LastName')).to.eq(user.LastName)
                    expect(formData.get('FirstName')).to.eq(user.FirstName)
                    expect(formData.get('Patronymic')).to.eq(user.Patronymic)
                    expect(formData.get('NoPatronymic')).to.eq(`${user.NoPatronymic}`)
                    expect(formData.get('City')).to.eq(user.City)
                    expect(formData.get('SelectedDate')).to.eq(`${user.SelectedDate}`)
                    expect(formData.get('SelectedMonth')).to.eq('9')
                    expect(formData.get('SelectedYear')).to.eq(`${user.SelectedYear}`)
                    expect(formData.get('IsPhone')).to.eq(`${user.IsPhone}`)
                    expect(formData.get('Email')).to.eq('')
                    expect(formData.get('Phone')).to.eq(`${user.Phone?.code}${user.Phone?.phone}`)
                    expect(formData.get('Password')).to.eq(user.Password)
                    expect(formData.get('ConfirmPassword')).to.eq(user.ConfirmPassword)
                    expect(formData.get('NoPatronymic')).to.eq(`${user.NoPatronymic}`)
                })
                regPage.confirm.form.setValue(Cypress.env('STATIC_CODE'))
                regPage.confirm.form.clickBtnSubmit()
                cy.wait('@confirm').then((confirm) => {
                    expect(confirm.response?.statusCode).to.eq(302)
                    const formData = new URLSearchParams(confirm.request.body)
                    expect(formData.get('PhoneOrEmail')).to.eq(`${user.Phone?.code}${user.Phone?.phone}`)
                    expect(formData.get('Message')).to.eq(RegistrationLoc.CONFIRM_PHONE_MESSAGE)
                    expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                    expect(formData.get('NotReceiveMessage')).to.eq(RegistrationLoc.NOT_RECEIVED_MESSAGE)
                    expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                    expect(formData.get('Phone')).to.eq('')
                    expect(formData.get('Token')).to.eq('')
                    expect(formData.get('Code')).to.eq(Cypress.env('STATIC_CODE'))
                }).wait('@callback').then((callback) => {
                    expect(callback.response?.statusCode).to.eq(302)
                    expect(callback.response?.headers['location']).to.match(RegExp(/code=[0-9,A-Z]+/g))
                }).wait('@token').then((token) => {
                    expect(token.response?.statusCode).to.eq(200)
                    expect(token.response?.body.id_token).to.match(RegExp(/e[\w\d.-]+/gi))
                    expect(token.response?.body.access_token).to.match(RegExp(/e[\w\d.-]+/gi))
                    expect(token.response?.body.expires_in).to.eq(3600)
                    expect(token.response?.body.token_type).to.eq('Bearer')
                    expect(token.response?.body.scope).to.eq(client.scope)
                })
                cy.location().should((location) => {
                    expect(location.host).to.eq(getDomain())
                    expect(location.pathname).be.eq('/')
                })
            })
        })
        context('Email, пробелы, регистр', () => {
            let client: tQueryParams
            let user: tRegistration
            context('Регистрация с пробелами в Email', () => {
                beforeEach(() => {
                    user = userBodies.defaultUserEmailBody()
                    client = clients(portalClient)
                    user.Email = ` ${faker.name.lastName()}.${faker.name.firstName()}@${faker.internet.domainName()} `
                    cy.registration(client, user)
                })
                it('Отсутствие пробелов и нижний регистр в location', function () {
                    expect(this.regFormResponse.headers.location).to.contain(
                        `PhoneOrEmail=${user.Email?.replace(/\s/g, '').toLowerCase()}&`
                    )
                })
            })
            context('Регистрация пользователя с Email и Phone', () => {
                beforeEach(() => {
                    user = userBodies.userHasEmailPhoneBody()
                    client = clients(portalClient)
                    cy.registration(client, user, {
                        isConfirmationNeeded: false
                    }).get('@location').then((confirmForm) => {
                        cy.visit(String(confirmForm))
                    })
                })
                it('Возвращается редирект с query параметром PhoneOrEmail=Phone', function () {
                    expect(this.regFormResponse.headers.location).to.contain(
                        `PhoneOrEmail=${user.Phone?.code.replace('+', '%2B')}${user.Phone?.phone}&`
                    )
                    regPage.confirm.email().invoke('text').then((text) => {
                        expect(text).to.eq(`${user.Phone?.code}${user.Phone?.phone}`)
                    })
                })
                context('Подтверждение регистрации', () => {
                    const options: tOptions = { client, user }
                    let userId: number
                    beforeEach(() => {
                        regPage.confirm.form.setValue(Cypress.env('STATIC_CODE'))
                        regPage.confirm.form.clickBtnSubmit()
                    })
                    //TODO: доделать тест когда будет фильтрация по номеру телефона
                    it.skip('Пользователь зарегистрирован с reg_phone. В профайле phone подтвержден', () => {
                        //Проверка подтверждения номера телефона
                        assertPhoneConfirmationPostFormData(options)
                        //Проверка получения токена
                        assertCallbackAndToken(options)
                        //Проверка профайл юзера роли и подтвержденный номер телефона
                        cy.then(async () => {
                            userId = (await getUsersByFilter(instance,
                                filterBodies.defaultUserFilterByPhone(
                                    `${user.Phone?.code}${user.Phone?.phone}` ?? ''
                                )
                            )).data.users[0].userId as number
                            const profile = await getUserProfileById(instance, userId)
                            expect(profile.data.info.roles).to.eql(['ROLE_ADMIN', 'ROLE_USER'])
                            expect(profile.data.info.isTelConfirmed).to.eq(true)
                            expect(profile.data.info.tel).to.eq(
                                `${options.user.Phone?.code}${options.user.Phone?.phone}`
                            )
                        })
                    })
                })
            })
        })
        context('Удаленный пользователь', () => {
            let client: tQueryParams
            let userId: number
            context('Регистрация с Email', () => {
                beforeEach(() => {
                    user = userBodies.defaultUserEmailBody()
                    instance = createInstance()
                    client = clients(portalClient)
                    cy.registration(client, user).then({ timeout: 15000 }, async () => {
                        //Авторизация с ролью админ, получение токена
                        await authStep(instance).setAuthTokenHeader(credits.admin)
                        //Получение userId с помощью метода фильтрации по Email
                        userId = (await getUsersByFilter(instance,
                            filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                        ).data.users[0].userId as number
                        //Удаление пользователя isDeleted=true
                        await markAsDeleted(instance, { userId: userId })
                    }).visitRegistration(client)
                    regPage.form.setValuesRegForm(user)
                    regPage.form.agree.checkbox.check()
                    regPage.form.btnSubmit.click()
                })
                it('Ошибка регистрации. Пользователь удален', () => {
                    regPage.form.email.errorHint().should('be.visible')
                        .invoke('text').then((text) => {
                            expect(text).to.eq(RegistrationLoc.ACCOUNT_DELETED)
                        })
                })
            })
            context('Регистрация с Phone', () => {
                beforeEach(() => {
                    user = userBodies.defaultUserPhoneBody()
                    instance = createInstance()
                    client = clients(portalClient)
                    cy.registration(client, user).then({ timeout: 15000 }, async () => {
                        //Авторизация с ролью админ, получение токена
                        await authStep(instance).setAuthTokenHeader(credits.admin)
                        //Получение userId с помощью метода фильтрации по Email
                        userId = (await getUsersByFilter(instance,
                            filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                        ).data.users[0].userId as number
                        //Удаление пользователя isDeleted=true
                        await markAsDeleted(instance, { userId: userId })
                    }).visitRegistration(client)
                    regPage.form.setValuesRegForm(user)
                    regPage.form.agree.checkbox.check()
                    regPage.form.btnSubmit.click()
                })
                it('Ошибка регистрации. Пользователь удален', () => {
                    regPage.form.phone.errorHint().should('be.visible')
                        .invoke('text').then((text) => {
                            expect(text).to.eq(RegistrationLoc.ACCOUNT_DELETED)
                        })
                })
            })
            afterEach(() => {
                cy.then(async () => {
                    await deletePersonData(instance, { ids: [userId] })
                })
            })
        })
    })
})
