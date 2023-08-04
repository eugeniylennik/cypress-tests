import { tRegistration } from '../../../utils/types/identity.types'

export default class RegistrationPage {

    pageUrlSuffix = '/Registration'

    form = {
        container: ():Cypress.Chainable => cy.get('[data-testid="reg-form"]'),
        title: ():Cypress.Chainable => cy.get('[data-testid="reg-title"]'),
        lastName: {
            container: ():Cypress.Chainable => cy.get('[data-testid="lastName-block"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="lastName-label"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-lastName"]'),
            setValue: (value: string):Cypress.Chainable => this.form.lastName.input().type(value),
            clearInput: ():Cypress.Chainable => this.form.lastName.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-lastName"]')
        },
        firstName: {
            container: ():Cypress.Chainable => cy.get('[data-testid="firstName-block"]'),
            label: ():Cypress.Chainable => this.form.firstName.container().find('[data-testid="firstName-label"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-firstName"]'),
            setValue: (value: string):Cypress.Chainable => this.form.firstName.input().type(value),
            clearInput: ():Cypress.Chainable => this.form.firstName.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-firstName"]')
        },
        patronymic: {
            container: ():Cypress.Chainable => cy.get('[data-testid="patronymic-block"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="patronymic-label"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-patronymic"]'),
            setValue: (value: string):Cypress.Chainable => this.form.patronymic.input().type(value),
            clearInput: ():Cypress.Chainable => this.form.patronymic.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-patronymic"]')
        },
        noPatronymic: {
            container: ():Cypress.Chainable => cy.get('[data-testid="checkbox-noPatronymic-block"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="noPatronymic-label"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="checkbox-patronymic"]'),
            check: ():Cypress.Chainable => this.form.noPatronymic.input().check(),
            uncheck: ():Cypress.Chainable => this.form.noPatronymic.input().uncheck()
        },
        city: {
            container: ():Cypress.Chainable => cy.get('[data-testid="city-block"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="city-label"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-city"]'),
            setValue: (value: string):Cypress.Chainable => this.form.city.input().type(value),
            clearInput: ():Cypress.Chainable => this.form.city.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-city"'),
            list: {
                menu: ():Cypress.Chainable => cy.get('ul[class*=ui-menu]'),
                items: ():Cypress.Chainable => this.form.city.list.menu().find('.ui-menu-item'),
                setValueByNumber: (item: number):Cypress.Chainable => this.form.city.list.items().eq(item).click(),
                setValueByText: (city: string):Cypress.Chainable => this.form.city.list.items().contains(city).click()
            }
        },
        birthday: {
            container: ():Cypress.Chainable => cy.get('[data-testid="birth-block"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="birth-title"]'),
            model: ():Cypress.Chainable => cy.get('[data-testid="birth-model"]'),
            day: {
                block: ():Cypress.Chainable => this.form.birthday.model().find('.day'),
                label: ():Cypress.Chainable => cy.get('[data-testid="birth-day-label"]'),
                select: ():Cypress.Chainable => cy.get('[data-testid="birth-day-select"]'),
                selectValue: (day: number):Cypress.Chainable => this.form.birthday.day.select().select(day)
            },
            month: {
                block: ():Cypress.Chainable => this.form.birthday.model().find('.month'),
                label: ():Cypress.Chainable => cy.get('[data-testid="birth-month-label"]'),
                select: ():Cypress.Chainable => cy.get('[data-testid="birth-month-select"]'),
                selectValue: (month: string):Cypress.Chainable => this.form.birthday.month.select().select(month)
            },
            year: {
                block: ():Cypress.Chainable => this.form.birthday.model().find('.year'),
                label: ():Cypress.Chainable => cy.get('label[data-testid="birth-year-label"]'),
                select: ():Cypress.Chainable => cy.get('select[data-testid="birth-year-select"]'),
                selectValue: (year: number):Cypress.Chainable => this.form.birthday.year.select().select(String(year))
            },
            setValue: (
                birthDay: {
                    SelectedDate: number,
                    SelectedMonth: string | number,
                    SelectedYear: number
                }
            ):void => {
                this.form.birthday.day.selectValue(birthDay.SelectedDate)
                this.form.birthday.month.selectValue(String(birthDay.SelectedMonth))
                this.form.birthday.year.selectValue(birthDay.SelectedYear)
            },
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-birth"')
        },
        email: {
            radioBtn: ():Cypress.Chainable => cy.get('[data-testid="radioBtn-email"]'),
            inputRadioBtn: ():Cypress.Chainable => this.form.email.radioBtn().find('input'),
            check: ():Cypress.Chainable => this.form.email.inputRadioBtn().check(),
            label: ():Cypress.Chainable => cy.get('[data-testid="email-label"]'),
            container: ():Cypress.Chainable => cy.get('[data-testid="email-container"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-email"]'),
            setValue: (email: string) => this.form.email.input().type(email, {
                parseSpecialCharSequences: false
            }),
            clear: ():Cypress.Chainable => this.form.email.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-email"]')
        },
        phone: {
            radioBtn: ():Cypress.Chainable => cy.get('[data-testid="radioBtn-phone"]'),
            inputRadioBtn: ():Cypress.Chainable => this.form.phone.radioBtn().find('input'),
            check: ():Cypress.Chainable => this.form.phone.inputRadioBtn().check(),
            label: ():Cypress.Chainable => cy.get('[data-testid="phone-label"]'),
            container: ():Cypress.Chainable => cy.get('[data-testid="phone-container"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-phone"]:visible'),
            setValue: (phone: string):Cypress.Chainable => this.form.phone.input().type(phone),
            clear: ():Cypress.Chainable => this.form.phone.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-phone"]'),
            country: {
                flagContainer: (): Cypress.Chainable => this.form.phone.container().find('div[class*=flag-container]'),
                selectedFlag: ():Cypress.Chainable => this.form.phone.country.flagContainer().find('div[class*=selected-flag]'),
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
        password: {
            container: ():Cypress.Chainable => cy.get('[data-testid="pass-block"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="pass-label"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-pass"]'),
            setValue: (value: string):Cypress.Chainable => this.form.password.input().type(value),
            clearInput: ():Cypress.Chainable => this.form.password.input().clear(),
            hint: ():Cypress.Chainable => cy.get('[data-testid="hint-password"]'),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-pass"'),
            btnShowPass: ():Cypress.Chainable => cy.get('[data-testid="btn-showPass"]')
        },
        confirmPass: {
            container: ():Cypress.Chainable => cy.get('[data-testid="confirmPass-block"]'),
            label: ():Cypress.Chainable => cy.get('[data-testid="confirmPass-label"]'),
            input: ():Cypress.Chainable => cy.get('[data-testid="input-confirmPass"]'),
            setValue: (value: string):Cypress.Chainable => this.form.confirmPass.input().type(value),
            clearInput: ():Cypress.Chainable => this.form.confirmPass.input().clear(),
            errorHint: ():Cypress.Chainable => cy.get('[data-testid="errorHint-confirmPass"'),
            btnShowPass: ():Cypress.Chainable => cy.get('[data-testid="btn-showConfirmPass"]')
        },
        btnSubmit: {
            get: ():Cypress.Chainable => cy.get('[data-testid="btn-regSubmit"]:visible'),
            click: ():Cypress.Chainable => this.form.btnSubmit.get().click(),
            text: ():Cypress.Chainable => this.form.btnSubmit.get().invoke('text')
        },
        agree: {
            checkbox: {
                get: ():Cypress.Chainable => cy.get('[data-testid="checkbox-userAgree"]'),
                check: ():Cypress.Chainable => this.form.agree.checkbox.get().check(),
                uncheck: ():Cypress.Chainable => this.form.agree.checkbox.get().uncheck()
            },
            text: {
                get: ():Cypress.Chainable => cy.get('[data-testid="label-userAgree"]'),
                linkAgreement: ():Cypress.Chainable => cy.get('[data-testid="link-userAgree"]'),
                linkPolitic: ():Cypress.Chainable => cy.get('[data-testid="link-politic"]')
            }
        },
        setValuesRegForm: (user: tRegistration) => {
            this.form.lastName.setValue(user.LastName)
            this.form.firstName.setValue(user.FirstName)
            this.form.patronymic.setValue(user.Patronymic)
            this.form.city.setValue(user.City)
            this.form.birthday.setValue(user)
            if (user.Email !== undefined) this.form.email.setValue(user.Email)
            if (user.Phone !== undefined) {
                this.form.phone.check()
                this.form.phone.country.findByDialCode(user.Phone.code.substring(1))
                this.form.phone.setValue(String(user.Phone.phone))
            }
            this.form.password.setValue(user.Password)
            this.form.confirmPass.setValue(user.Password)
        }
    }

    confirm = {
        container:():Cypress.Chainable => cy.get('[data-testid="confirm-container"]'),
        title:():Cypress.Chainable => cy.get('[data-testid="confirm-title"]'),
        message:():Cypress.Chainable => cy.get('[data-testid="confirm-text"]'),
        email:():Cypress.Chainable => cy.get('[data-testid="email"]'),
        phone:():Cypress.Chainable => cy.get('[data-testid="phone"]'),
        form: {
            container:():Cypress.Chainable => cy.get('[data-testid="confirm-form"]'),
            block:():Cypress.Chainable => cy.get('[data-testid="confirm-block"]'),
            input:():Cypress.Chainable => cy.get('[data-testid="input-code"]'),
            errorHint:():Cypress.Chainable => cy.get('[data-testid="errorHint-code"]'),
            setValue:(code: string):Cypress.Chainable => this.confirm.form.input().type(code),
            clearInput:():Cypress.Chainable => this.confirm.form.input().clear(),
            countDown:():Cypress.Chainable => cy.get('p[id*=countdown]'),
            count:():Cypress.Chainable => cy.get('span[id=countdown]'),
            btnCodeRepeat:():Cypress.Chainable => cy.get('[data-testid="btn-codeRepeat"]:visible'),
            btnSubmit:():Cypress.Chainable => cy.get('[data-testid="btn-confirmSubmit"]'),
            clickBtnCodeRepeat:():Cypress.Chainable => this.confirm.form.btnCodeRepeat().click(),
            clickBtnSubmit:():Cypress.Chainable => this.confirm.form.btnSubmit().click()
        },
        noCode:():Cypress.Chainable => cy.get('[data-testid="link-noCode"]'),
        btnCancel:():Cypress.Chainable => cy.get('[data-testid="link-cancel"]')
    }

    footer = {
        block: ():Cypress.Chainable => cy.get('[data-testid="hasAccount-block"]'),
        btnLogin: ():Cypress.Chainable => cy.get('[data-testid="link-login"]'),
        socialNetworks: {
            fb: ():Cypress.Chainable => cy.get('[data-testid="fb"]'),
            ok: ():Cypress.Chainable => cy.get('[data-testid="ok"]'),
            vk: ():Cypress.Chainable => cy.get('[data-testid="vk"]'),
            google: ():Cypress.Chainable => cy.get('[data-testid="google"]')
        }
    }

}
