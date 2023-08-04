import { tQueryParams, tRegistration } from '../../../utils/types/identity.types'
import { clients, portalClient } from '../../../data/clients/clients'
import { userBodies } from '../../../utils/generate.helpers'
import RecoveryPage from '../../../pages/identity/recovery/Recovery'
import { getDomain } from '@data/domains'
import { convertObjectToQueryParams } from '@helpers/helpers'
import { createInstance } from '@helpers/instance'
import credits from '@data/credits'
import { deletePersonData, getUsersByFilter, markAsDeleted } from '@helpers/api-helpers/profile/user/helpers'
import { filterBodies } from '@bodyGenerator/profile/user/filter/filter.bodies'
import { LoginLoc, RecoveryLoc } from '../../../utils/localization'
import { AxiosInstance } from 'axios'
import { endpoints } from '@api/endpoints'
import authStep from '@api/rsv-auth/auth.steps'

describe('Восстановление пароля', () => {

    const client: tQueryParams = clients(portalClient)
    const recoveryPage = new RecoveryPage
    const path = convertObjectToQueryParams(client)

    context('Email', () => {
        const user: tRegistration = userBodies.defaultUserEmailBody()
        beforeEach(() => {
            cy.registration(client, user)
                .visitRecovery(client)
            recoveryPage.form.email.setValue(user.Email ?? '')
            recoveryPage.form.btnSubmit.click()
        })
        it('Восстановление пароля с помощью Email ', () => {
            cy.wait('@postForm').then((form) => {
                expect(form.response?.statusCode).to.eq(302)
                const formData = new URLSearchParams(form.request.body)
                expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                expect(formData.get('Email')).to.eq(user.Email)
            })
            recoveryPage.confirm.form.setValue(Cypress.env('STATIC_CODE'))
            recoveryPage.confirm.form.clickBtnSubmit()
            cy.wait('@confirm').then((confirm) => {
                expect(confirm.response?.statusCode).to.eq(302)
                const formData = new URLSearchParams(confirm.request.body)
                expect(formData.get('PhoneOrEmail')).to.eq(user.Email)
                expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                expect(formData.get('Phone')).to.eq('')
                expect(formData.get('Token')).to.eq('')
                expect(formData.get('HasWhiteLabel')).to.eq('False')
                expect(formData.get('Code')).to.eq(Cypress.env('STATIC_CODE'))
            })
            const newPassword = user.Password.split('').reverse().join('')
            recoveryPage.changePassword.form.submitChangePassword(newPassword)
            cy.wait('@password').then((password) => {
                expect(password.response?.statusCode).to.eq(302)
                expect(password.response?.headers['location']).to.contain('/Account/Login')
                const formData = new URLSearchParams(password.request.body)
                expect(formData.get('PhoneOrEmail')).to.eq(user.Email)
                expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                expect(formData.get('HasWhiteLabel')).to.eq('False')
                expect(formData.get('Password')).to.eq(newPassword)
                expect(formData.get('ConfirmPassword')).to.eq(newPassword)
            })
        })
        // afterEach(() => {})
    })
    context('Phone', () => {
        const user: tRegistration = userBodies.defaultUserPhoneBody()
        const phone = `${user.Phone?.code}${user.Phone?.phone}`
        beforeEach(() => {
            cy.registration(client, user)
                .visitRecovery(client)
            recoveryPage.form.radioBtnPhone().click()
            recoveryPage.form.phone.setValue(user.Phone?.phone ?? '')
            recoveryPage.form.btnSubmit.click()
        })
        it('Восстановление пароля с помощью Phone ', () => {
            cy.wait('@postForm').then((form) => {
                expect(form.response?.statusCode).to.eq(302)
                const formData = new URLSearchParams(form.request.body)
                expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                expect(formData.get('Phone')).to.eq(phone)
            })
            recoveryPage.confirm.form.setValue(Cypress.env('STATIC_CODE'))
            recoveryPage.confirm.form.clickBtnSubmit()
            cy.wait('@confirm').then((confirm) => {
                expect(confirm.response?.statusCode).to.eq(302)
                const formData = new URLSearchParams(confirm.request.body)
                expect(formData.get('PhoneOrEmail')).to.eq(phone)
                expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                expect(formData.get('Phone')).to.eq('')
                expect(formData.get('Token')).to.eq('')
                expect(formData.get('HasWhiteLabel')).to.eq('False')
                expect(formData.get('Code')).to.eq(Cypress.env('STATIC_CODE'))
            })
            const newPassword = user.Password.split('').reverse().join('')
            recoveryPage.changePassword.form.submitChangePassword(newPassword)
            cy.wait('@password').then((password) => {
                expect(password.response?.statusCode).to.eq(302)
                expect(password.response?.headers['location']).to.contain('/Account/Login')
                const formData = new URLSearchParams(password.request.body)
                expect(formData.get('PhoneOrEmail')).to.eq(phone)
                expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
                expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
                expect(formData.get('HasWhiteLabel')).to.eq('False')
                expect(formData.get('Password')).to.eq(newPassword)
                expect(formData.get('ConfirmPassword')).to.eq(newPassword)
            })
        })
        // afterEach(() => {})
    })
    context('Удаленный пользователь', () => {
        let instance: AxiosInstance
        let user: tRegistration
        let client: tQueryParams
        let userId: number
        context('Восстановление пароля с Email', () => {
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
                }).visitRecovery(client)
                recoveryPage.form.email.setValue(user.Email ?? '')
                recoveryPage.form.btnSubmit.click()
            })
            it('Ошибка восстановления пароля. Пользователь удален', () => {
                recoveryPage.form.email.errorHint().should('be.visible')
                    .invoke('text').then((text) => {
                        expect(text).to.eq(RecoveryLoc.ACCOUNT_DELETED)
                    })
            })
        })
        context('Восстановление пароля с Phone', () => {
            beforeEach(() => {
                user = userBodies.defaultUserPhoneBody()
                instance = createInstance()
                client = clients(portalClient)
                cy.registration(client, user).then({timeout: 15000}, async () => {
                    //Авторизация с ролью админ, получение токена
                    await authStep(instance).setAuthTokenHeader(credits.admin)
                    //Получение userId с помощью метода фильтрации по Email
                    userId = (await getUsersByFilter(instance,
                        filterBodies.defaultUserFilterByEmail(user.Email ?? ''))
                    ).data.users[0].userId as number
                    //Удаление пользователя isDeleted=true
                    await markAsDeleted(instance, { userId: userId })
                }).visitRecovery(client)
                recoveryPage.form.radioBtnPhone().click()
                recoveryPage.form.phone.setValue(user.Phone?.phone ?? '')
                recoveryPage.form.btnSubmit.click()
            })
            it('Ошибка регистрации. Пользователь удален', () => {
                recoveryPage.form.phone.errorHint().should('be.visible')
                    .invoke('text').then((text) => {
                        expect(text).to.eq(RecoveryLoc.ACCOUNT_DELETED)
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
        context('Восстановление пароля с Email', () => {
            beforeEach(() => {
                client = clients(portalClient)
                const user = userBodies.defaultUserEmailBody()
                cy.visitRecovery(client)
                recoveryPage.form.email.setValue(user.Email ?? '')
                recoveryPage.form.btnSubmit.click()
            })
            it('Ошибка пользователь не найден', () => {
                recoveryPage.form.email.errorHint().should('be.visible')
                    .invoke('text').then((text) => {
                        expect(text).to.eq(LoginLoc.NOT_FOUND)
                    })
            })
        })
        context('Восстановление пароля с Phone', () => {
            beforeEach(() => {
                client = clients(portalClient)
                const user = userBodies.defaultUserPhoneBody()
                cy.visitRecovery(client)
                recoveryPage.form.radioBtnPhone().click()
                recoveryPage.form.phone.country.findByDialCode(user.Phone?.code.substring(1) ?? '')
                recoveryPage.form.phone.setValue(String(user.Phone?.phone))
                recoveryPage.form.btnSubmit.click()
            })
            it('Ошибка пользователь не найден', () => {
                recoveryPage.form.phone.errorHint().should('be.visible')
                    .invoke('text').then((text) => {
                        expect(text).to.eq(LoginLoc.NOT_FOUND)
                    })
            })
        })
    })
})
