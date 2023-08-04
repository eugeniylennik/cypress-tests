import { tQueryParams } from '../../../utils/types/identity.types'
import { endpoints } from '@api/endpoints'

Cypress.Commands.add(
    'visitAccountLogin',
    { prevSubject: 'optional' },
    (
        subject,
        params: tQueryParams,
        mobile?: boolean
    ) => {
        // eslint-disable-next-line no-unused-expressions
        mobile ? cy.viewport(375, 812) : false
        Cypress.log({
            name: 'Visit /Account/Login',
            message: `client_id: ${params?.client_id}`
        })
        const authorizeRequest = {
            method: 'GET',
            url: endpoints.identity.connect.authorize,
            qs: params,
            followRedirect: false
        }
        cy.request(authorizeRequest).then((response ) => {
            expect(response.status).to.eq(302,
                'Не работает редирект на форму авторизации'
            )
            cy.wrap(new URL(response.redirectedToUrl ?? '').search
                .replace('R', 'r'))
                .as('query')
            cy.intercept({
                method: 'POST',
                url: response.redirectedToUrl,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).as('postForm')
            cy.intercept({
                method: 'GET',
                url: `${endpoints.identity.connect.callback}**`
            }).as('callback')
            cy.intercept({
                method: 'POST',
                url: endpoints.identity.connect.token,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).as('token')
            cy.intercept({
                method: 'POST',
                url: `${endpoints.identity.form.twoFA}**`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).as('2fa')
            cy.intercept({
                method: 'POST',
                url: `${endpoints.identity.form.addPhone}**`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).as('addPhone')
            cy.intercept({
                method: 'POST',
                url: `${endpoints.identity.form.addPhoneConfirmation}**`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).as('phoneConfirmation')
            cy.visit(response.redirectedToUrl ?? '')
        })
    }
)
