export default class RecoveryPage {

    pageUrlSuffix = '/Recovery'

    form = {
        container:():Cypress.Chainable => cy.get('[data-testid="recovery-form"]'),
        title:():Cypress.Chainable => cy.get('[data-testid="recovery-title"]'),
        radioBtnEmail: ():Cypress.Chainable => cy.get('[data-testid="radioBtn-phone"] input'),
        radioBtnPhone: ():Cypress.Chainable => cy.get('[data-testid="radioBtn-phone"] input'),
        email: {
            input:():Cypress.Chainable => cy.get('[data-testid="input-email"]'),
            errorHint:():Cypress.Chainable => cy.get('[data-testid="errorHint-email"]'),
            setValue:(emailOrPhone: string):Cypress.Chainable => this.form.email.input().type(emailOrPhone),
            clearInput:():Cypress.Chainable => this.form.email.input().clear()
        },
        phone: {
            container:():Cypress.Chainable => cy.get('[data-testid="phone-container"]'),
            input:():Cypress.Chainable => cy.get('div[class*=iti] [data-testid="input-phone"]'),
            errorHint:():Cypress.Chainable => cy.get('[data-testid="errorHint-phone"]'),
            setValue:(phone: string):Cypress.Chainable => this.form.phone.input().type(phone),
            clearInput:():Cypress.Chainable => this.form.phone.input().clear(),
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
            }
        },
        btnSubmit: {
            get:():Cypress.Chainable => cy.get('[data-testid="btn-recoverySubmit"]'),
            click:():Cypress.Chainable => this.form.btnSubmit.get().click()
        },
        footer: {
            linkNoCode:():Cypress.Chainable => cy.get('[data-testid="link-noCode"]'),
            linkCancel:():Cypress.Chainable => cy.get('[data-testid="link-cancel"]')
        }
    }

    confirm = {
        container:():Cypress.Chainable => cy.get('[data-testid="confirm-container"]'),
        title:():Cypress.Chainable => cy.get('[data-testid="confirm-title"]'),
        message:():Cypress.Chainable => cy.get('[data-testid="confirm-text"]'),
        email:():Cypress.Chainable => cy.get('[data-testid="email"]'),
        form: {
            container:():Cypress.Chainable => cy.get('[data-testid="confirm-form"]'),
            block:():Cypress.Chainable => cy.get('[data-testid="confirm-block"]'),
            input:():Cypress.Chainable => cy.get('[data-testid="input-code"]'),
            countdown:():Cypress.Chainable => cy.get('p[id*=countdown]'),
            errorHint:():Cypress.Chainable => cy.get('[data-testid="errorHint-code"]'),
            btnCodeRepeat:():Cypress.Chainable => this.confirm.form.container().find('[data-testid="btn-codeRepeat"]'),
            btnSubmit:():Cypress.Chainable => cy.get('[data-testid="btn-confirmSubmit"]'),
            setValue:(code: string):Cypress.Chainable => this.confirm.form.input().type(code),
            clearInput:():Cypress.Chainable => this.confirm.form.input().clear(),
            clickBtnCodeRepeat:():Cypress.Chainable => this.confirm.form.btnCodeRepeat().click(),
            clickBtnSubmit:():Cypress.Chainable => this.confirm.form.btnSubmit().click()
        }
    }

    changePassword = {
        container:():Cypress.Chainable => cy.get('[data-testid="changePassword-container"]'),
        title:():Cypress.Chainable => cy.get('[data-testid="changePassword-title"]'),
        form: {
            container:():Cypress.Chainable => cy.get('[data-testid="changePassword-form"]'),
            password: {
                block:():Cypress.Chainable => cy.get('[data-testid="pass-block"]'),
                label:():Cypress.Chainable => cy.get('[data-testid="pass-label"]'),
                input:():Cypress.Chainable => cy.get('[data-testid="input-pass"]'),
                btnShowPass:():Cypress.Chainable => cy.get('[data-testid="btn-showPass"]'),
                hint:():Cypress.Chainable => cy.get('[data-testid="hint-password"]'),
                errorHint:():Cypress.Chainable => cy.get('[data-testid="errorHint-pass"]'),
                setValue:(password: string):Cypress.Chainable => this.changePassword.form.password.input().type(password),
                clearInput:():Cypress.Chainable => this.changePassword.form.password.input().clear()
            },
            confirmPass: {
                block:():Cypress.Chainable => cy.get('[data-testid="confirmPass-block"]'),
                label:():Cypress.Chainable => cy.get('[data-testid="confirmPass-label"]'),
                input:():Cypress.Chainable => cy.get('[data-testid="input-confirmPass"]'),
                btnShowPass:():Cypress.Chainable => cy.get('[data-testid="btn-showConfirmPass"]'),
                errorHint:():Cypress.Chainable => cy.get('[data-testid="errorHint-confirmPass"]'),
                setValue:(password: string):Cypress.Chainable => this.changePassword.form.confirmPass.input().type(password),
                clearInput:():Cypress.Chainable => this.changePassword.form.confirmPass.input().clear()
            },
            btnSubmit:():Cypress.Chainable => cy.get('[data-testid="btn-changePasswordSubmit"]'),
            btnCancel:():Cypress.Chainable => cy.get('[data-testid="btn-cancel"]'),
            submitChangePassword: (password: string): void => {
                this.changePassword.form.password.setValue(password)
                this.changePassword.form.confirmPass.setValue(password)
                this.changePassword.form.btnSubmit().click()
            }
        }
    }
}
