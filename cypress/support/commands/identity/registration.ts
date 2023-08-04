import { tQueryParams, tRegistration } from '../../../utils/types/identity.types'
import { convertObjectToQueryParams } from '@helpers/helpers'
import { getDomain } from '@data/domains'
import dateTime from '@helpers/date'
import baseUrls from '@api/base.urls'
import { endpoints } from '@api/endpoints'

Cypress.Commands.add(
    'registration',
    { prevSubject: 'optional' },
    (
        subject,
        params: tQueryParams,
        user: tRegistration,
        options?: {
            isConfirmationNeeded: boolean
        }
    ) => {
        const path = convertObjectToQueryParams(params)
        const postFormBody = Object.assign({}, user, {
            Phone: user.Phone !== undefined ?
                `${user.Phone.code}${user.Phone.phone}` : '',
            RedirectUrl: params.redirect_uri,
            ReturnUrl: endpoints.identity.redirection.callbackLocation(path),
            MainUrl: `${getDomain('web')}/`,
            HasWhitelabel: 'False'
        })
        const postForm = {
            method: 'POST',
            url: endpoints.identity.form.registration,
            qs: {
                'returnUrl': postFormBody.ReturnUrl
            },
            form: true,
            followRedirect: false,
            body: postFormBody
        }
        cy.request(postForm).then((confirm): void => {
            cy.wrap(confirm).as('regFormResponse')
            expect(confirm.status).to.eq(302,
                'Не работает редирект на форму подтверждения регистрации'
            )
            //Возвращает редирект на форму подтверждения регистрации
            const location = `${baseUrls.identity.url}${confirm.headers['location']}`
            if (options?.isConfirmationNeeded.valueOf() === false) {
                cy.wrap(location).as('location')
                return
            }
            cy.request(location)
            const confirmFormBody = {
                PhoneOrEmail: user.Email ? user.Email : user.Phone,
                MainUrl: postFormBody.MainUrl,
                RepeatExpired: dateTime.getDateTimeCodeWithOffset(),
                CodeExpired: dateTime.getDateTimeCodeWithOffset(20),
                ReturnUrl: postFormBody.ReturnUrl,
                Phone: user.Phone,
                Token: '',
                HasWhiteLabel: 'False',
                Code: Cypress.env('STATIC_CODE')
            }
            const confirmFormRequest = {
                method: 'POST',
                url: location,
                form: true,
                followRedirect: true,
                body: confirmFormBody
            }
            cy.request(confirmFormRequest)
        })
    }
)
