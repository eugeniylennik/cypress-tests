import { tQueryParams } from '../../../utils/types/identity.types'
import { convertObjectToQueryParams } from '@helpers/helpers'
import { endpoints } from '@api/endpoints'

Cypress.Commands.add(
    'visitRegistration',
    {prevSubject: 'optional'},
    (
        subject,
        params: tQueryParams,
        mobile?: boolean
    ) => {
        // eslint-disable-next-line no-unused-expressions
        mobile ? cy.viewport(375, 812) : false
        const returnUrl = convertObjectToQueryParams(params)
        const registration = {
            url: endpoints.identity.form.registration,
            qs: {
                'returnUrl': endpoints.identity.redirection.callbackLocation(returnUrl)
            }
        }
        cy.wrap(registration).as('query')
        Cypress.log({
            name: 'Visit /Registration',
            message: `client_id: ${params?.client_id}`
        })
        cy.intercept({
            method: 'POST',
            url: `${registration.url}**`,
            query: registration.qs,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).as('postForm')
        cy.intercept({
            method: 'POST',
            url: `${endpoints.identity.form.confirmation}**`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).as('confirm')
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
        cy.visit(registration)
    }
)
