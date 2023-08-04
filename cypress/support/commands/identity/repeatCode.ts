import { tQueryParams } from '../../../utils/types/identity.types'
import { convertObjectToQueryParams } from '@helpers/helpers'
import { endpoints } from '@api/endpoints'

Cypress.Commands.add(
    'repeatCode',
    { prevSubject: 'optional' },
    (
        subject,
        params: tQueryParams,
        phoneOrEmail: string,
        countRepeat?:number
    ) => {
        const path = convertObjectToQueryParams(params)
        const repeatCodeFormBody = {
            PhoneOrEmail: phoneOrEmail,
            ReturnUrl: endpoints.identity.redirection.callbackLocation(path),
            Phone: '',
            Token: ''
        }
        const requestRepeatCode = {
            method: 'POST',
            url: endpoints.identity.form.repeatCode,
            form: true,
            followRedirect: false,
            body: repeatCodeFormBody
        }
        countRepeat = countRepeat ?? 1
        for (let i = 0; i < countRepeat; i++) {
            cy.request(requestRepeatCode).then((response) => {
                cy.wrap(response.headers['location']).as('confirm')
            })
        }
    }
)
