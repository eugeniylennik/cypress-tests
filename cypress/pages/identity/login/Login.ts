import { tUserCredits } from '@data/types'
import { tRegistration } from '../../../utils/types/identity.types'

export default class LoginPage {

    pageUrlSuffix = '/Account/Login'

    form = {
        container: ():Cypress.Chainable => cy.get('[data-testid="login-container"]'),
        title: ():Cypress.Chainable => cy.get('[data-testid="login-title"]'),
        block: ():Cypress.Chainable => cy.get('[data-testid="login-block"]'),
        loginForm: ():Cypress.Chainable => cy.get('[data-testid="login-form"]'),
        radioBtnEmail: ():Cypress.Chainable => cy.get('[data-testid="radioBtn-phone"] input'),
        radioBtnPhone: ():Cypress.Chainable => cy.get('[data-testid="radioBtn-phone"] input'),
        email: {
            container: ():Cypress.Chainable => cy.get('[data-testid="email-container"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="email-label"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-email"]'),
            setValue: (value: string):Cypress.Chainable => this.form.email.input().type(value),
            clearInput: ():Cypress.Chainable => this.form.email.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-email"]')
        },
        phone: {
            container: ():Cypress.Chainable => cy.get('[data-testid="phone-container"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="phone-label"]'),
            input: ():Cypress.Chainable => cy.get('div[class*=iti] [data-testid="input-phone"]'),
            setValue: (value: string):Cypress.Chainable => this.form.phone.input().type(value),
            clearInput: ():Cypress.Chainable => this.form.phone.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-phone"]'),
            country: {
                flagContainer: (): Cypress.Chainable => this.form.phone.container().find('div[class*=flag-container]'),
                selectedFlag: ():Cypress.Chainable => this.form.phone.container().find('div[class*=selected-flag]'),
                selectedCode: ():Cypress.Chainable => this.form.phone.country.selectedFlag().find('div[class*=selected-dial-code]'),
                listBox: ():Cypress.Chainable => this.form.phone.country.flagContainer().find('ul[id*=country-list]'),
                list: ():Cypress.Chainable => this.form.phone.country.listBox().find('li[class*=country]'),
                findByCountryCode: (code: string):Cypress.Chainable => {
                    this.form.phone.country.flagContainer().click()
                    return this.form.phone.country.listBox().find(`[data-country-code=${code}]`).first().click()
                },
                findByDialCode: (code: string):Cypress.Chainable => {
                    this.form.phone.country.flagContainer().click()
                    return this.form.phone.country.listBox().find(`[data-dial-code=${code}]`).first().click()
                }
            },
            authorizationByPhone: (user: tRegistration): void => {
                this.phone.form.country.findByDialCode(user.Phone?.code.substring(1) ?? '')
                this.phone.form.setValue(user.Phone?.phone ?? '')
                this.form.password.setValue(user.Password)
                this.form.btnSubmit.click()
            }
        },
        password: {
            container: ():Cypress.Chainable => cy.get('[data-testid="password-container"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="label-password"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-password"]'),
            setValue: (value: string):Cypress.Chainable => this.form.password.input().type(value),
            clearInput: ():Cypress.Chainable => this.form.email.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-password"]'),
            clickBtnShowPass: ():Cypress.Chainable => cy.get('[data-testid="btn-showPass"]').click()
        },
        btnSubmit: {
            get: ():Cypress.Chainable => cy.get('[data-testid="btn-loginSubmit"]'),
            click: ():Cypress.Chainable => this.form.btnSubmit.get().click()
        },
        authorization: (user: tUserCredits): void => {
            this.form.email.setValue(user.Email ?? '')
            this.form.password.setValue(user.Password)
            this.form.btnSubmit.click()
        }
    }

    phone = {
        container:():Cypress.Chainable => cy.get('[data-testid="two-factor-container"]'),
        title:():Cypress.Chainable => cy.get('[data-testid="two-factor-title"]'),
        message:():Cypress.Chainable => cy.get('[data-testid="text-admin"]'),
        phoneForm:():Cypress.Chainable => cy.get('[data-testid="two-factor-form"]'),
        form: {
            container:():Cypress.Chainable => cy.get('[data-testid="phone-container"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-phone"]:visible'),
            setValue: (value: string):Cypress.Chainable => this.phone.form.input().type(value),
            clearInput: ():Cypress.Chainable => this.phone.form.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-phone"]'),
            country: {
                flagContainer: (): Cypress.Chainable => this.phone.form.container().find('div[class*=flag-container]'),
                selectedFlag: ():Cypress.Chainable => this.phone.form.container().find('div[class*=selected-flag]'),
                selectedCode: ():Cypress.Chainable => this.phone.form.country.selectedFlag().find('div[class*=selected-dial-code]'),
                listBox: ():Cypress.Chainable => this.phone.form.country.flagContainer().find('ul[id*=country-list]'),
                list: ():Cypress.Chainable => this.phone.form.country.listBox().find('li[class*=country]'),
                findByCountryCode: (code: string):Cypress.Chainable => {
                    this.phone.form.country.flagContainer().click()
                    return this.phone.form.country.listBox().find(`[data-country-code=${code}]`).first().click()
                },
                findByDialCode: (code: string):Cypress.Chainable => {
                    this.phone.form.country.flagContainer().click()
                    return this.phone.form.country.listBox().find(`[data-dial-code=${code}]`).first().click()
                }
            }
        },
        btnSubmit: {
            get: ():Cypress.Chainable => cy.get('[data-testid="btn-phoneSubmit"]:visible'),
            click: ():Cypress.Chainable => this.phone.btnSubmit.get().click()
        },
        submitPhoneNumber: (phone: { code: string; phone: string }): void => {
            this.phone.form.country.findByDialCode(phone.code.substring(1))
            this.phone.form.setValue(phone.phone)
            //TODO: переделать вейт на другой механизм
            cy.wait(1000)
            this.phone.btnSubmit.click()
        }
    }

    confirm = {
        container:():Cypress.Chainable => cy.get('[data-testid="confirm-container"]'),
        title:():Cypress.Chainable => cy.get('[data-testid="confirm-title"]'),
        message:():Cypress.Chainable => cy.get('[data-testid="confirm-text"]'),
        phone:():Cypress.Chainable => cy.get('[data-testid="phone"]'),
        form: {
            container:():Cypress.Chainable => cy.get('[data-testid="confirm-form"]'),
            block:():Cypress.Chainable => cy.get('[data-testid="confirm-block"]'),
            input:():Cypress.Chainable => cy.get('[data-testid="input-code"]'),
            errorHint:():Cypress.Chainable => cy.get('[data-testid="errorHint-code"]'),
            setValue:(code: string):Cypress.Chainable => this.confirm.form.input().type(code),
            clearInput:():Cypress.Chainable => this.confirm.form.input().clear(),
            countdown:():Cypress.Chainable => cy.get('p[id*=countdown]'),
            btnCodeRepeat:():Cypress.Chainable => cy.get('[data-testid="btn-codeRepeat"]'),
            btnSubmit:():Cypress.Chainable => cy.get('[data-testid="btn-confirmSubmit"]'),
            clickBtnCodeRepeat:():Cypress.Chainable => this.confirm.form.btnCodeRepeat().click(),
            clickBtnSubmit:():Cypress.Chainable => this.confirm.form.btnSubmit().click()
        },
        noCode:():Cypress.Chainable => cy.get('[data-testid="link-noCode"]'),
        btnCancel:():Cypress.Chainable => cy.get('[data-testid="link-cancel"]'),
        submitCodeConfirmation: (code: string) => {
            this.confirm.form.setValue(code)
            this.confirm.form.clickBtnSubmit()
        }
    }

    footer = {
        noAccountText: ():Cypress.Chainable => cy.get('[data-testid="noAccountText"]').invoke('text'),
        btnRegistration: ():Cypress.Chainable => cy.get('[data-testid="link-reg"]'),
        btnRecoveryPassword: ():Cypress.Chainable => cy.get('[data-testid="link-rememberPassword"]'),
        socialNetworks: {
            fb: ():Cypress.Chainable => cy.get('[data-testid="fb"]'),
            ok: ():Cypress.Chainable => cy.get('[data-testid="ok"]'),
            vk: ():Cypress.Chainable => cy.get('[data-testid="vk"]'),
            google: ():Cypress.Chainable => cy.get('[data-testid="google"]')
        }
    }

}
