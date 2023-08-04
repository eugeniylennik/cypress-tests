import { tQueryParams } from '../../../utils/types/identity.types'
import { tUserCredits } from '@data/types'
import { convertObjectToQueryParams } from '@helpers/helpers'
import { getDomain } from '@data/domains'
import baseUrls from '@api/base.urls'
import dateTime from '@helpers/date'
import { endpoints } from '@api/endpoints'

Cypress.Commands.add(
    'authorize',
    { prevSubject: 'optional' },
    (
        subject,
        params: tQueryParams,
        user: tUserCredits
    ) => {
        const path = convertObjectToQueryParams(params)
        Cypress.log({
            name: `Login As ${user.Roles}`,
            message: `Email: ${user.Email}`
        })
        const authorizeRequest = {
            method: 'GET',
            url: endpoints.identity.connect.authorize,
            qs: params,
            followRedirect: false
        }
        cy.request(authorizeRequest).then((form) => {
            expect(form.status).to.eq(302,
                'Не работает редирект на форму авторизации'
            )
            const location = form.headers['location']
            const postFormBody = {
                RedirectUrl: params.redirect_uri,
                ReturnUrl: endpoints.identity.redirection.callbackLocation(path),
                MainUrl: `${getDomain('web')}/`,
                HideRegistration: 'False',
                IsMobile: 'False',
                HasWhitelabel: 'False',
                HideExternalProviders: 'False',
                Username: user.Email ? user.Email : user.Phone,
                Password: user.Password
            }
            const postFormRequest = {
                method: 'POST',
                url: `${location}`,
                form: true,
                followRedirect: true,
                body: postFormBody
            }
            cy.request(postFormRequest).then((callback) => {
                if (user.Roles?.includes('ROLE_ADMIN')) {
                    const location = callback.allRequestResponses[0]['Response Headers']['location']
                    const twoFaFormBody = {
                        PhoneOrEmail: user.Email ? user.Email : user.Phone,
                        MainUrl: postFormBody.MainUrl,
                        RepeatExpired: dateTime.getDateTimeCodeWithOffset(),
                        CodeExpired: dateTime.getDateTimeCodeWithOffset(20),
                        ReturnUrl: postFormBody.ReturnUrl,
                        Phone: user.Phone,
                        Token: '',
                        HasWhiteLabel: 'False',
                        Code: '123456'
                    }
                    const twoFaFormRequest = {
                        method: 'POST',
                        url: `${baseUrls.identity.url}${location}`,
                        form: true,
                        body: twoFaFormBody
                    }
                    cy.request(twoFaFormRequest).then((callback) => {
                        const callbackUrl = callback.allRequestResponses[2]['Request URL']
                        cy.visit(callbackUrl)
                    })
                } else {
                    const callbackUrl = callback.allRequestResponses[2]['Request URL']
                    cy.visit(callbackUrl)
                }
            })
        })
    }
)
