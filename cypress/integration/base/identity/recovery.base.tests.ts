import { visitIdentityPage } from '../../../pages/tools'
import { LoginLoc, RecoveryLoc, RegistrationLoc } from '../../../utils/localization'
import { getDomain } from '@data/domains'
import Header from '../../../pages/identity/common/Header'
import RecoveryPage from '../../../pages/identity/recovery/Recovery'
import credits from '@data/credits'
import { tQueryParams, tRegistration } from '../../../utils/types/identity.types'
import { clients, portalClient } from '../../../data/clients/clients'
import { userBodies } from '../../../utils/generate.helpers'
import { onlyOn } from '@cypress/skip-test'

describe('Базовые тесты на форму восстановления пароля', () => {

    const header = new Header
    const recoveryPage = new RecoveryPage

    beforeEach(() => {
        visitIdentityPage(recoveryPage.pageUrlSuffix)
    })

    context('Шапка', () => {
        it('Кнопка "Назад"', () => {
            header.btnBack().should('be.visible')
            header.txtBtnBack().then((text) => {
                expect(text).to.eq(LoginLoc.BTN_BACK)
            })
        })

        it('Тайтл', () => {
            recoveryPage.form.title().invoke('text').then((text) => {
                expect(text).to.eq(RecoveryLoc.TITLE)
            })
            recoveryPage.form.title().should('have.css', 'text-align', 'center')
                .should('have.css', 'font-weight', '700')
                .should('have.css', 'color', 'rgb(42, 38, 38)')
        })

        context('Портал', () => {
            beforeEach(() => {
                header.goBack()
            })
            it('Открылась главная страница', () => {
                cy.location().should((location) => {
                    expect(location.href).to.eq(`${getDomain('web')}/`)
                    expect(location.pathname).be.eq('/')
                })
            })
        })

        it('Логотип', () => {
            header.getLogo().should('be.visible')
        })
    })

    context('Форма восстановления пароля', () => {
        it('Тайтл', () => {
            recoveryPage.form.title().invoke('text').then((text) => {
                expect(text).to.eq(RecoveryLoc.TITLE)
            })
            recoveryPage.form.title().should('have.css', 'text-align', 'center')
                .should('have.css', 'font-weight', '700')
                .should('have.css', 'color', 'rgb(42, 38, 38)')
        })

        context('Email', () => {
            context('Ввод значений', () => {
                context('Пустое поле', () => {
                    beforeEach(() => {
                        recoveryPage.form.btnSubmit.click()
                    })

                    it('Ошибка пустого поля', () => {
                        recoveryPage.form.email.errorHint().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(RecoveryLoc.EMAIL_ERROR_HINT)
                            })
                        recoveryPage.form.email.errorHint()
                            .should('have.css', 'color', 'rgb(209, 0, 74)')
                    })
                })
                context('Невалидные значения', () => {
                    ['test', 'test@.com', '@', '+'].forEach((emailOrPhone: string) => {
                        it('Ошибка Неверный формат E-mail', () => {
                            recoveryPage.form.email.setValue(emailOrPhone)
                            recoveryPage.form.btnSubmit.click()
                            recoveryPage.form.email.errorHint().invoke('text')
                                .then((text) => {
                                    expect(text).to.eq(RecoveryLoc.EMAIL_INVALIDATE_MESSAGE)
                                })
                            recoveryPage.form.email.errorHint()
                                .should('have.css', 'color', 'rgb(209, 0, 74)')
                        })
                    })
                })
                context('Валидные значения', () => {
                    beforeEach(() => {
                        recoveryPage.form.email.setValue(credits.user.Email ?? '')
                        recoveryPage.form.btnSubmit.click()
                    })
                    it('Форма подтверждения восстановления пароля', () => {
                        recoveryPage.confirm.container().should('be.visible')
                    })
                    context('Подтверждение восстановления пароля', () => {
                        context('Шапка', () => {
                            it('Кнопка "Назад"', () => {
                                header.btnBack().should('be.visible')
                                header.txtBtnBack().then((text) => {
                                    expect(text).to.eq(LoginLoc.BTN_BACK)
                                })
                            })
                            it('Логотип', () => {
                                header.getLogo().should('be.visible')
                            })
                            context('Портал', () => {
                                beforeEach(() => {
                                    header.goBack()
                                })
                                it('Открылась главная страница', () => {
                                    cy.location().should((location) => {
                                        expect(location.href).to.eq(`${getDomain('web')}/`)
                                        expect(location.pathname).be.eq('/')
                                    })
                                })
                            })
                            it('Тайтл', () => {
                                recoveryPage.confirm.title().invoke('text').then((text) => {
                                    expect(text).to.eq(RecoveryLoc.TITLE)
                                })
                                recoveryPage.confirm.title().should('have.css', 'text-align', 'center')
                                    .should('have.css', 'font-weight', '700')
                                    .should('have.css', 'color', 'rgb(42, 38, 38)')
                            })
                            it('Сообщение', () => {
                                recoveryPage.confirm.message().invoke('text').then((message) => {
                                    expect(message).to.match(RecoveryLoc.CONFIRM_MESSAGE)
                                })
                                recoveryPage.confirm.email().invoke('text').should('eq', credits.user.Email)
                            })
                        })
                        context('Форма подтверждения восстановления пароля', () => {
                            it('Инпут код сообщения', () => {
                                recoveryPage.confirm.form.input().should('be.visible')
                                recoveryPage.confirm.form.input().should('have.attr', 'placeholder', RecoveryLoc.CODE_INPUT)
                            })
                            it('Текст отправить повторно', () => {
                                recoveryPage.confirm.form.clickBtnCodeRepeat().wait(1000)
                                recoveryPage.confirm.form.countdown()
                                    .should('not.have.attr', 'style', 'display: none;')
                                recoveryPage.confirm.form.countdown().invoke('text').then((text) => {
                                    expect(text).to.match(RecoveryLoc.REPEAT_TIME)
                                })
                            })
                            context('Кнопка отправить повторно', () => {
                                beforeEach(() => {
                                    cy.wait(10000)
                                })
                                it('Активна', () => {
                                    recoveryPage.confirm.form.countdown()
                                        .should('have.attr', 'style', 'display: none;')
                                    recoveryPage.confirm.form.btnCodeRepeat()
                                        .should('have.attr', 'style', '')
                                        .invoke('text').then((text) => {
                                            expect(text).to.eq(RecoveryLoc.REPEAT)
                                        })
                                })
                            })
                            context('Ввод значений', () => {
                                context('Невалидные значения', () => {
                                    ['test', '789312'].forEach((code: string) => {
                                        it('Ошибка подтвреждения кода', () => {
                                            recoveryPage.confirm.form.setValue(code)
                                            recoveryPage.confirm.form.clickBtnSubmit()
                                            recoveryPage.confirm.form.errorHint().invoke('text')
                                                .then((text) => {
                                                    expect(text).to.eq(RecoveryLoc.CODE_ERROR_HINT)
                                                })
                                            recoveryPage.confirm.form.errorHint()
                                                .should('have.css', 'color', 'rgb(209, 0, 74)')
                                        })
                                    })
                                })
                                context('Валидные значения', () => {
                                    beforeEach(() => {
                                        recoveryPage.confirm.form.setValue(Cypress.env('STATIC_CODE'))
                                        recoveryPage.confirm.form.clickBtnSubmit()
                                    })
                                    it('Форма изменения пароля', () => {
                                        recoveryPage.changePassword.container().should('be.visible')
                                    })
                                    context('Поле Пароль/Повторите пароль', () => {
                                        context('Поле Пароль', () => {
                                            it('Инпут', () => {
                                                recoveryPage.changePassword.form.password.input()
                                                    .should('be.visible')
                                                recoveryPage.changePassword.form.password.label().invoke('text')
                                                    .then((label) => {
                                                        expect(label).to.eq(RecoveryLoc.PASSWORD)
                                                    })
                                            })
                                            it('Кнопка видимости пароля', () => {
                                                recoveryPage.changePassword.form.password.btnShowPass().should('be.visible')
                                            })
                                            context('Фокусировка', () => {
                                                beforeEach(() => {
                                                    recoveryPage.changePassword.form.password.input().wait(1000).click()
                                                })
                                                it('Плэйсхолдер', () => {
                                                    recoveryPage.changePassword.form.password.label()
                                                        .should('have.attr',
                                                            'style',
                                                            'top: 6px; font-size: 14px; font-weight: 400;'
                                                        )
                                                })
                                                context('Дефокусировка', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.confirmPass.input().wait(1000).click()
                                                    })
                                                    it('Плэйсхолдер', () => {
                                                        recoveryPage.changePassword.form.password.label()
                                                            .should('have.attr',
                                                                'style',
                                                                'top: 25px; font-size: 18px; font-weight: 400;'
                                                            )
                                                    })
                                                })
                                            })
                                            context('Ввод значений', () => {
                                                const password = '123456'
                                                beforeEach(() => {
                                                    recoveryPage.changePassword.form.password.setValue(password)
                                                })
                                                it('Значение', () => {
                                                    recoveryPage.changePassword.form.password.input()
                                                        .should('have.value', password)
                                                    recoveryPage.changePassword.form.password.input()
                                                        .should('have.attr', 'type', 'password')
                                                })
                                                it('Инфо хинт', () => {
                                                    recoveryPage.changePassword.form.password.hint()
                                                        .should('have.text', RegistrationLoc.PASS_HINT)
                                                })
                                                context('Видимость пароля', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.password.btnShowPass().click()
                                                    })
                                                    it('Пароль виден', () => {
                                                        recoveryPage.changePassword.form.password.input()
                                                            .should('have.attr', 'type', 'text')
                                                    })
                                                })
                                                context('Очистка значения', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.password.clearInput()
                                                    })
                                                    it('Значение', () => {
                                                        recoveryPage.changePassword.form.password.input()
                                                            .should('have.value', '')
                                                    })
                                                })
                                            })
                                        })
                                        context('Поле Повторите пароль', () => {
                                            it('Инпут', () => {
                                                recoveryPage.changePassword.form.confirmPass.input().should('be.visible')
                                                recoveryPage.changePassword.form.confirmPass.label().invoke('text')
                                                    .then((label) => {
                                                        expect(label).to.eq(RecoveryLoc.CONFIRM_PASSWORD)
                                                    })
                                            })
                                            it('Кнопка видимости пароля', () => {
                                                recoveryPage.changePassword.form.confirmPass.btnShowPass()
                                                    .should('be.visible')
                                            })
                                            context('Фокусировка', () => {
                                                beforeEach(() => {
                                                    recoveryPage.changePassword.form.confirmPass.input().wait(1000).click()
                                                })
                                                it('Плэйсхолдер', () => {
                                                    recoveryPage.changePassword.form.confirmPass.label()
                                                        .should('have.attr',
                                                            'style',
                                                            'top: 6px; font-size: 14px; font-weight: 400;'
                                                        )
                                                })
                                                context('Дефокусировка', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.password.input().wait(1000).click()
                                                    })
                                                    it('Плэйсхолдер', () => {
                                                        recoveryPage.changePassword.form.confirmPass.label()
                                                            .should('have.attr',
                                                                'style',
                                                                'top: 25px; font-size: 18px; font-weight: 400;'
                                                            )
                                                    })
                                                })
                                            })
                                            context('Ввод значений', () => {
                                                const password = '123456'
                                                beforeEach(() => {
                                                    recoveryPage.changePassword.form.confirmPass.setValue(password)
                                                })
                                                it('Значение', () => {
                                                    recoveryPage.changePassword.form.confirmPass.input()
                                                        .should('have.value', password)
                                                    recoveryPage.changePassword.form.confirmPass.input()
                                                        .should('have.attr', 'type', 'password')
                                                })
                                                context('Видимость пароля', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.confirmPass.btnShowPass().click()
                                                    })
                                                    it('Пароль виден', () => {
                                                        recoveryPage.changePassword.form.confirmPass.input()
                                                            .should('have.attr', 'type', 'text')
                                                    })
                                                })
                                                context('Очистка значения', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.confirmPass.clearInput()
                                                    })
                                                    it('Значение', () => {
                                                        recoveryPage.changePassword.form.confirmPass.input()
                                                            .should('have.value', '')
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
        context('Номер телефона', () => {
            beforeEach(() => {
                recoveryPage.form.radioBtnPhone().click()
            })
            context('Ввод значений', () => {
                context('Пустое поле', () => {
                    beforeEach(() => {
                        recoveryPage.form.btnSubmit.click()
                    })

                    it('Ошибка пустого поля', () => {
                        recoveryPage.form.phone.errorHint().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(RecoveryLoc.PHONE_ERROR_HINT)
                            })
                        recoveryPage.form.phone.errorHint()
                            .should('have.css', 'color', 'rgb(209, 0, 74)')
                    })
                })
                context('Невалидные значения', () => {
                    ['1234567', '8123154455', '0000000', '3153141213'].forEach((phone: string) => {
                        it('Ошибка Неверный формат номера телефона', () => {
                            recoveryPage.form.phone.setValue(phone)
                            recoveryPage.form.btnSubmit.click()
                            recoveryPage.form.phone.errorHint().invoke('text')
                                .then((text) => {
                                    expect(text).to.eq(RecoveryLoc.PHONE_INVALIDATE_MESSAGE)
                                })
                            recoveryPage.form.phone.errorHint()
                                .should('have.css', 'color', 'rgb(209, 0, 74)')
                        })
                    })
                })
                context('Валидные значения', () => {
                    const client: tQueryParams = clients(portalClient)
                    const user: tRegistration = userBodies.defaultUserPhoneBody()
                    before(() => {
                        cy.registration(client, user, {
                            isConfirmationNeeded: false
                        })
                    })
                    beforeEach(() => {
                        recoveryPage.form.phone.setValue(user.Phone?.phone ?? '')
                        recoveryPage.form.btnSubmit.click()
                    })
                    it('Форма подтверждения восстановления пароля', () => {
                        recoveryPage.confirm.container().should('be.visible')
                    })
                    context('Подтверждение восстановления пароля', () => {
                        context('Шапка', () => {
                            it('Кнопка "Назад"', () => {
                                header.btnBack().should('be.visible')
                                header.txtBtnBack().then((text) => {
                                    expect(text).to.eq(LoginLoc.BTN_BACK)
                                })
                            })
                            it('Логотип', () => {
                                header.getLogo().should('be.visible')
                            })
                            context('Портал', () => {
                                beforeEach(() => {
                                    header.goBack()
                                })
                                it('Открылась главная страница', () => {
                                    cy.location().should((location) => {
                                        expect(location.href).to.eq(`${getDomain('web')}/`)
                                        expect(location.pathname).be.eq('/')
                                    })
                                })
                            })
                            it('Тайтл', () => {
                                recoveryPage.confirm.title().invoke('text').then((text) => {
                                    expect(text).to.eq(RecoveryLoc.TITLE)
                                })
                                recoveryPage.confirm.title().should('have.css', 'text-align', 'center')
                                    .should('have.css', 'font-weight', '700')
                                    .should('have.css', 'color', 'rgb(42, 38, 38)')
                            })
                            onlyOn(Cypress.env('IS_PHONE_ENABLED'), () => {
                                it('Сообщение', () => {
                                    recoveryPage.confirm.message().invoke('text').then((message) => {
                                        expect(message).to.eq(RecoveryLoc.CALL_PHONE_MESSAGE)
                                    })
                                    recoveryPage.confirm.email().invoke('text')
                                        .should('eq', `${user.Phone?.code}${user.Phone?.phone}`)
                                })
                            })
                        })
                        context('Форма подтверждения восстановления пароля', () => {
                            it('Инпут код сообщения', () => {
                                recoveryPage.confirm.form.input().should('be.visible')
                                recoveryPage.confirm.form.input().should('have.attr', 'placeholder', RecoveryLoc.CODE_INPUT)
                            })
                            it('Текст отправить повторно', () => {
                                recoveryPage.confirm.form.clickBtnCodeRepeat().wait(1000)
                                recoveryPage.confirm.form.countdown()
                                    .should('not.have.attr', 'style', 'display: none;')
                                recoveryPage.confirm.form.countdown().invoke('text').then((text) => {
                                    expect(text).to.match(RecoveryLoc.REPEAT_TIME)
                                })
                            })
                            context('Кнопка отправить повторно', () => {
                                beforeEach(() => {
                                    cy.wait(10000)
                                })
                                it('Активна', () => {
                                    recoveryPage.confirm.form.countdown()
                                        .should('have.attr', 'style', 'display: none;')
                                    recoveryPage.confirm.form.btnCodeRepeat()
                                        .should('have.attr', 'style', '')
                                        .invoke('text').then((text) => {
                                            expect(text).to.eq(RecoveryLoc.REPEAT)
                                        })
                                })
                            })
                            context('Ввод значений', () => {
                                context('Невалидные значения', () => {
                                    ['test', '789312'].forEach((code: string) => {
                                        it('Ошибка подтвреждения кода', () => {
                                            recoveryPage.confirm.form.setValue(code)
                                            recoveryPage.confirm.form.clickBtnSubmit()
                                            recoveryPage.confirm.form.errorHint().invoke('text')
                                                .then((text) => {
                                                    expect(text).to.eq(RecoveryLoc.CODE_ERROR_HINT)
                                                })
                                            recoveryPage.confirm.form.errorHint()
                                                .should('have.css', 'color', 'rgb(209, 0, 74)')
                                        })
                                    })
                                })
                                context('Валидные значения', () => {
                                    beforeEach(() => {
                                        recoveryPage.confirm.form.setValue(Cypress.env('STATIC_CODE'))
                                        recoveryPage.confirm.form.clickBtnSubmit()
                                    })
                                    it('Форма изменения пароля', () => {
                                        recoveryPage.changePassword.container().should('be.visible')
                                    })
                                    context('Поле Пароль/Повторите пароль', () => {
                                        context('Поле Пароль', () => {
                                            it('Инпут', () => {
                                                recoveryPage.changePassword.form.password.input()
                                                    .should('be.visible')
                                                recoveryPage.changePassword.form.password.label().invoke('text')
                                                    .then((label) => {
                                                        expect(label).to.eq(RecoveryLoc.PASSWORD)
                                                    })
                                            })
                                            it('Кнопка видимости пароля', () => {
                                                recoveryPage.changePassword.form.password.btnShowPass().should('be.visible')
                                            })
                                            context('Фокусировка', () => {
                                                beforeEach(() => {
                                                    recoveryPage.changePassword.form.password.input().wait(1000).click()
                                                })
                                                it('Плэйсхолдер', () => {
                                                    recoveryPage.changePassword.form.password.label()
                                                        .should('have.attr',
                                                            'style',
                                                            'top: 6px; font-size: 14px; font-weight: 400;'
                                                        )
                                                })
                                                context('Дефокусировка', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.confirmPass.input().wait(1000).click()
                                                    })
                                                    it('Плэйсхолдер', () => {
                                                        recoveryPage.changePassword.form.password.label()
                                                            .should('have.attr',
                                                                'style',
                                                                'top: 25px; font-size: 18px; font-weight: 400;'
                                                            )
                                                    })
                                                })
                                            })
                                            context('Ввод значений', () => {
                                                const password = '123456'
                                                beforeEach(() => {
                                                    recoveryPage.changePassword.form.password.setValue(password)
                                                })
                                                it('Значение', () => {
                                                    recoveryPage.changePassword.form.password.input()
                                                        .should('have.value', password)
                                                    recoveryPage.changePassword.form.password.input()
                                                        .should('have.attr', 'type', 'password')
                                                })
                                                it('Инфо хинт', () => {
                                                    recoveryPage.changePassword.form.password.hint()
                                                        .should('have.text', RegistrationLoc.PASS_HINT)
                                                })
                                                context('Видимость пароля', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.password.btnShowPass().click()
                                                    })
                                                    it('Пароль виден', () => {
                                                        recoveryPage.changePassword.form.password.input()
                                                            .should('have.attr', 'type', 'text')
                                                    })
                                                })
                                                context('Очистка значения', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.password.clearInput()
                                                    })
                                                    it('Значение', () => {
                                                        recoveryPage.changePassword.form.password.input()
                                                            .should('have.value', '')
                                                    })
                                                })
                                            })
                                        })
                                        context('Поле Повторите пароль', () => {
                                            it('Инпут', () => {
                                                recoveryPage.changePassword.form.confirmPass.input().should('be.visible')
                                                recoveryPage.changePassword.form.confirmPass.label().invoke('text')
                                                    .then((label) => {
                                                        expect(label).to.eq(RecoveryLoc.CONFIRM_PASSWORD)
                                                    })
                                            })
                                            it('Кнопка видимости пароля', () => {
                                                recoveryPage.changePassword.form.confirmPass.btnShowPass()
                                                    .should('be.visible')
                                            })
                                            context('Фокусировка', () => {
                                                beforeEach(() => {
                                                    recoveryPage.changePassword.form.confirmPass.input().wait(1000).click()
                                                })
                                                it('Плэйсхолдер', () => {
                                                    recoveryPage.changePassword.form.confirmPass.label()
                                                        .should('have.attr',
                                                            'style',
                                                            'top: 6px; font-size: 14px; font-weight: 400;'
                                                        )
                                                })
                                                context('Дефокусировка', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.password.input().wait(1000).click()
                                                    })
                                                    it('Плэйсхолдер', () => {
                                                        recoveryPage.changePassword.form.confirmPass.label()
                                                            .should('have.attr',
                                                                'style',
                                                                'top: 25px; font-size: 18px; font-weight: 400;'
                                                            )
                                                    })
                                                })
                                            })
                                            context('Ввод значений', () => {
                                                const password = '123456'
                                                beforeEach(() => {
                                                    recoveryPage.changePassword.form.confirmPass.setValue(password)
                                                })
                                                it('Значение', () => {
                                                    recoveryPage.changePassword.form.confirmPass.input()
                                                        .should('have.value', password)
                                                    recoveryPage.changePassword.form.confirmPass.input()
                                                        .should('have.attr', 'type', 'password')
                                                })
                                                context('Видимость пароля', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.confirmPass.btnShowPass().click()
                                                    })
                                                    it('Пароль виден', () => {
                                                        recoveryPage.changePassword.form.confirmPass.input()
                                                            .should('have.attr', 'type', 'text')
                                                    })
                                                })
                                                context('Очистка значения', () => {
                                                    beforeEach(() => {
                                                        recoveryPage.changePassword.form.confirmPass.clearInput()
                                                    })
                                                    it('Значение', () => {
                                                        recoveryPage.changePassword.form.confirmPass.input()
                                                            .should('have.value', '')
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
