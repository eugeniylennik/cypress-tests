import { tQueryParams } from '../../../utils/types/identity.types'
import { convertObjectToQueryParams } from '@helpers/helpers'
import { endpoints } from '@api/endpoints'

Cypress.Commands.add(
    'visitRecovery',
    {prevSubject: 'optional'},
    (
        subject,
        params: tQueryParams,
        mobile?: boolean
    ) => {
        // eslint-disable-next-line no-unused-expressions
        mobile ? cy.viewport(375, 812) : false
        const returnUrl = convertObjectToQueryParams(params)
        const recovery = {
            url: endpoints.identity.form.recovery,
            qs: {
                'returnUrl': endpoints.identity.redirection.callbackLocation(returnUrl)
            }
        }
        Cypress.log({
            name: 'Visit /Recovery',
            message: `client_id: ${params?.client_id}`
        })
        cy.intercept({
            method: 'POST',
            url: `${recovery.url}**`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).as('postForm')
        cy.intercept({
            method: 'POST',
            url: `${endpoints.identity.form.recoveryConfirm}**`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).as('confirm')
        cy.intercept({
            method: 'POST',
            url: `${endpoints.identity.form.recoveryPassword}**`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).as('password')
        cy.visit(recovery)
    }
)
