import { getDomain } from '@data/domains'
import { tQueryParams, tRegistration } from '../utils/types/identity.types'
import { convertObjectToQueryParams } from '@helpers/helpers'
import { Interception } from 'cypress/types/net-stubbing'
import { RegistrationLoc } from '../utils/localization'
import { endpoints } from '@api/endpoints'

export type tOptions = {
    client: tQueryParams,
    user: tRegistration
}

export function assertAuthorizationPostFormData(
    options: tOptions
): Cypress.Chainable<Interception> {
    return cy.wait('@postForm').then((form) => {
        //Редирект на страницу ввода номера телефона
        const location = form.response?.headers['location']
        expect(form.response?.statusCode).to.eq(302)
        // expect(location).to.contain('/Admin/AddPhone')
        const formData = new URLSearchParams(form.request.body)
        expect(formData.get('RedirectUrl')).to.eq(options.client.redirect_uri)
        expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
        expect(formData.get('HideRegistration')).to.eq('False')
        expect(formData.get('IsMobile')).to.eq('False')
        expect(formData.get('Password')).to.eq(options.user.Password)
        if (options.user.Email !== undefined) {
            expect(formData.get('Email')).to.eq(options.user.Email)
        } else {
            expect(formData.get('Phone')).to.eq(
                `${options.user.Phone?.code}${options.user.Phone?.phone}`
            )
        }
    })
}

export function assertAddPhonePostFormData(
    options: tOptions
): Cypress.Chainable<Interception> {
    const path = convertObjectToQueryParams(options.client)
    return cy.wait('@addPhone').then((form) => {
        //Редирект на страницу подтвреждения номера телефона
        const location = form.response?.headers['location']
        expect(form.response?.statusCode).to.eq(302)
        expect(location).to.contain('/Admin/Confirmation')
        const formData = new URLSearchParams(form.request.body)
        expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
        expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
        expect(formData.get('UserName')).to.eq(options.user.Email)
        expect(formData.get('Phone')).to.eq(
            `${options.user.Phone?.code}${options.user.Phone?.phone}`
        )
    })
}

export function assertPhoneConfirmationPostFormData(
    options: tOptions
): Cypress.Chainable<Interception> {
    const path = convertObjectToQueryParams(options.client)
    return cy.wait('@phoneConfirmation').then((form) => {
        expect(form.response?.statusCode).to.eq(302)
        const location = form.response?.headers['location']
        expect(location).to.eq(endpoints.identity.redirection.callbackLocation(path))
        const formData = new URLSearchParams(form.request.body)
        expect(formData.get('PhoneOrEmail')).to.eq(options.user.Email)
        expect(formData.get('Message')).to.eq('')
        expect(formData.get('MainUrl')).to.eq(`${getDomain('web')}/`)
        expect(formData.get('NotReceiveMessage')).to.eq(RegistrationLoc.NOT_RECEIVED_MESSAGE)
        expect(formData.get('ReturnUrl')).to.eq(endpoints.identity.redirection.callbackLocation(path))
        expect(formData.get('Phone')).to.eq(
            `${options.user.Phone?.code}${options.user.Phone?.phone}`
        )
        expect(formData.get('Code')).to.eq(Cypress.env('STATIC_CODE'))
    })
}

export function assertCallbackAndToken(
    options: tOptions
): Cypress.Chainable<Interception> {
    return cy.wait('@callback').then((callback) => {
        expect(callback.response?.statusCode).to.eq(302)
        expect(callback.response?.headers['location']).to.match(RegExp(/code=[0-9,A-Z]+/g))
    }).wait('@token').then((token) => {
        expect(token.response?.statusCode).to.eq(200)
        expect(token.response?.body.id_token).to.match(RegExp(/e[\w\d.-]+/gi))
        expect(token.response?.body.access_token).to.match(RegExp(/e[\w\d.-]+/gi))
        expect(token.response?.body.expires_in).to.eq(3600)
        expect(token.response?.body.token_type).to.eq('Bearer')
        //expect(token.response?.body.scope).to.eq(options.client.scope)
    })
}
