import { clients, portalClient, webClient } from '../../../data/clients/clients'
import LoginPage from '../../../pages/identity/login/Login'
import { convertObjectToQueryParams } from '@helpers/helpers'
import credits from '@data/credits'
import { getDomain } from '@data/domains'
import { tQueryParams, tRegistration } from '../../../utils/types/identity.types'
import { AxiosInstance } from 'axios'
import { userBodies } from '../../../utils/generate.helpers'
import { createInstance } from '@helpers/instance'
import { deletePersonData, getUsersByFilter, markAsDeleted } from '@helpers/api-helpers/profile/user/helpers'
import { filterBodies } from '@bodyGenerator/profile/user/filter/filter.bodies'
import { LoginLoc } from '../../../utils/localization'
import { endpoints } from '@api/endpoints'
import authStep from '@api/rsv-auth/auth.steps'

describe('Авторизация тесты', () => {

    const loginPage = new LoginPage

    context('Форма авторизации', () => {

        const client: tQueryParams = clients(portalClient)
        const path = convertObjectToQueryParams(client)

        beforeEach(() => {
            cy.visitAccountLogin(client)
        })

        it('Авторизованный пользователь с ролью ROLE_USER', () => {
            Cypress.log({
                name: 'POST /Account/Login',
                message: `Email: ${credits.user.Email},
                          Password: ${credits.user.Password}`
            })
            loginPage.form.authorization(credits.user)
            cy.wait('@postForm').then((form) => {
                expect(form.response?.statusCode).to.eq(302)
                const location = form.response?.headers['location']
                expect(location).to.eq(endpoints.identity.redirection.callbackLocation(path))
                const formData = new URLSearchParams(form.request.body)
                expect(formData.get('RedirectUrl')).to.eq(client.redirect_uri)
                expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                expect(formData.get('HideRegistration')).to.eq('False')
                expect(formData.get('IsMobile')).to.eq('False')
                expect(formData.get('Email')).to.eq(credits.user.Email)
                expect(formData.get('Password')).to.eq(credits.user.Password)
            }).wait('@callback').then((callback) => {
                expect(callback.response?.statusCode).to.eq(302)
                expect(callback.response?.headers['location']).to.match(RegExp(/code=[0-9,A-Z]+/g))
            }).wait('@token').then((token) => {
                expect(token.response?.statusCode).to.eq(200)
                expect(token.response?.body.id_token).to.match(RegExp(/e[\w\d.-]+/gi))
                expect(token.response?.body.access_token).to.match(RegExp(/e[\w\d.-]+/gi))
                expect(token.response?.body.expires_in).to.eq(3600)
                expect(token.response?.body.token_type).to.eq('Bearer')
                //expect(token.response?.body.scope).to.eq(client.scope)
            })
            cy.location().should((location) => {
                expect(location.host).to.eq(getDomain())
                expect(location.pathname).be.eq('/')
            })
        })

        it('Авторизованный пользователь с ролью ROLE_ADMIN', () => {
            Cypress.log({
                name: 'POST /Account/Login',
                message: `Email: ${credits.admin.Email},
                          Password: ${credits.admin.Password}`
            })
            loginPage.form.authorization(credits.admin)
            cy.wait('@postForm').then((form) => {
                expect(form.response?.statusCode).to.eq(302)
                const formData = new URLSearchParams(form.request.body)
                expect(formData.get('RedirectUrl')).to.eq(client.redirect_uri)
                expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                expect(formData.get('HideRegistration')).to.eq('False')
                expect(formData.get('IsMobile')).to.eq('False')
                expect(formData.get('Email')).to.eq(credits.admin.Email)
                expect(formData.get('Password')).to.eq(credits.admin.Password)
            })
            loginPage.confirm.form.setValue(Cypress.env('STATIC_CODE'))
            loginPage.confirm.form.clickBtnSubmit()
            cy.wait('@2fa').then((form) => {
                expect(form.response?.statusCode).to.eq(302)
                const location = form.response?.headers['location']
                expect(location).to.eq(endpoints.identity.redirection.callbackLocation(path))
                const formData = new URLSearchParams(form.request.body)
                expect(formData.get('PhoneOrEmail')).to.eq(credits.admin.Email)
                expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                expect(formData.get('Phone')).to.eq(credits.admin.Phone)
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
                //expect(token.response?.body.scope).to.eq(client.scope)
            })
            cy.location().should((location) => {
                expect(location.host).to.eq(getDomain())
                expect(location.pathname).be.eq('/')
            })
        })
    })

    context('Удаленный пользователь', () => {
        let instance: AxiosInstance
        let user: tRegistration
        let client: tQueryParams
        let userId: number
        context('Авторизация пользователя с Email', () => {
            beforeEach(() => {
                user = userBodies.defaultUserEmailBody()
                instance = createInstance()
                client = clients(webClient)
                cy.registration(client, user).then({ timeout: 15000 }, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Удаление пользователя isDeleted=true
                    await markAsDeleted(instance, { userId: userId })
                }).clearCookies()
                    .visitAccountLogin(client)
                loginPage.form.email.setValue(user.Email ?? '')
                loginPage.form.password.setValue(user.Password)
                loginPage.form.btnSubmit.click()
            })
            it('Ошибка авторизации. Пользователь удален', () => {
                loginPage.form.email.errorHint().should('be.visible')
                    .invoke('text').then((text) => {
                        expect(text).to.eq(LoginLoc.ACCOUNT_DELETED)
                    })
            })
        })
        context('Авторизация пользователя с Phone', () => {
            beforeEach(() => {
                user = userBodies.defaultUserPhoneBody()
                const phone = `${user.Phone?.phone}`
                instance = createInstance()
                client = clients(webClient)
                cy.registration(client, user).then({ timeout: 15000 }, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Удаление пользователя isDeleted=true
                    await markAsDeleted(instance, { userId: userId })
                }).clearCookies()
                    .visitAccountLogin(client)
                loginPage.form.radioBtnPhone().click()
                loginPage.form.phone.setValue(phone)
                loginPage.form.password.setValue(user.Password)
                loginPage.form.btnSubmit.click()
            })
            it('Ошибка авторизации. Пользователь удален', () => {
                loginPage.form.phone.errorHint().should('be.visible')
                    .invoke('text').then((text) => {
                        expect(text).to.eq(LoginLoc.ACCOUNT_DELETED)
                    })
            })
        })
        afterEach(() => {
            cy.then(async () => {
                await deletePersonData(instance, { ids: [userId] })
            })
        })
    })

    context('Пользователь не найден', () => {
        let client: tQueryParams
        context('Авторизация пользователя с Email', () => {
            beforeEach(() => {
                client = clients(portalClient)
                const user = userBodies.defaultUserEmailBody()
                cy.visitAccountLogin(client)
                loginPage.form.email.setValue(user.Email ?? '')
                loginPage.form.password.setValue(user.Password)
                loginPage.form.btnSubmit.click()
            })
            it('Ошибка пользователь не найден', () => {
                loginPage.form.email.errorHint().should('be.visible')
                    .invoke('text').then((text) => {
                        expect(text).to.eq(LoginLoc.NOT_FOUND)
                    })
            })
        })
        context('Авторизация пользователя с Phone', () => {
            beforeEach(() => {
                client = clients(portalClient)
                const user = userBodies.defaultUserPhoneBody()
                cy.visitAccountLogin(client)
                loginPage.form.radioBtnPhone().click()
                loginPage.form.phone.country.findByDialCode(user.Phone?.code.substring(1) ?? '')
                loginPage.form.phone.setValue(String(user.Phone?.phone))
                loginPage.form.password.setValue(user.Password)
                loginPage.form.btnSubmit.click()
            })
            it('Ошибка пользователь не найден', () => {
                loginPage.form.phone.errorHint().should('be.visible')
                    .invoke('text').then((text) => {
                        expect(text).to.eq(LoginLoc.NOT_FOUND)
                    })
            })
        })
    })
})
