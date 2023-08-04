import LoginPage from '../../../pages/identity/login/Login'
import { getDomain } from '@data/domains'
import { LoginLoc } from '../../../utils/localization'
import RegistrationPage from '../../../pages/identity/registration/Registration'
import RecoveryPage from '../../../pages/identity/recovery/Recovery'
import { clients, portalClient } from '../../../data/clients/clients'
import Header from '../../../pages/identity/common/Header'
import { tQueryParams } from '../../../utils/types/identity.types'
import { endpoints } from '@api/endpoints'

describe('Базовые тесты на форму авторизации', () => {

    const header = new Header
    const loginPage = new LoginPage
    const regPage = new RegistrationPage
    const recoveryPage = new RecoveryPage
    const client: tQueryParams = clients(portalClient)

    beforeEach(() => {
        cy.visitAccountLogin(client)
    })

    context('Шапка', () => {
        it('Кнопка "Назад"', () => {
            header.btnBack().should('be.visible')
            header.txtBtnBack().then((text) => {
                expect(text).to.eq(LoginLoc.BTN_BACK)
            })
        })

        context('Портал', () => {
            beforeEach(() => {
                cy.visitAccountLogin(client)
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

    context('Форма авторизации', () => {
        it('Тайтл', () => {
            loginPage.form.title().invoke('text').then((text) => {
                expect(text).to.eq(LoginLoc.TITLE)
            })
            loginPage.form.title().should('have.css', 'text-align', 'center')
                .should('have.css', 'font-weight', '700')
                .should('have.css', 'color', 'rgb(42, 38, 38)')
        })

        it('Email', () => {
            loginPage.form.email.input().should('be.visible')
            loginPage.form.email.label().invoke('text').then((text) => {
                expect(text).to.eq(LoginLoc.EMAIL)
            })
        })

        it('Номер телефона', () => {
            loginPage.form.radioBtnPhone().click()
            loginPage.form.phone.input().should('be.visible')
            loginPage.form.phone.label().invoke('text').then((text) => {
                expect(text).to.eq(LoginLoc.PHONE)
            })
        })

        it('Password', () => {
            loginPage.form.password.input().should('be.visible')
            loginPage.form.password.label().invoke('text').then((text) => {
                expect(text).to.eq(LoginLoc.PASSWORD)
            })
            loginPage.form.password.label()
                .should('have.attr', 'style', 'top: 25px; font-size: 18px; font-weight: 400;')
        })

        context('Фокус Password', () => {
            beforeEach(() => {
                loginPage.form.password.input().wait(1000).click()
            })
            it('Плэйсхолдер', () => {
                loginPage.form.password.label()
                    .should('have.attr', 'style', 'top: 6px; font-size: 14px; font-weight: 400;')
            })
            context('Дефокусировка', () => {
                beforeEach(() => {
                    loginPage.form.email.input().click()
                })
                it('Плэйсхолдер', () => {
                    loginPage.form.password.label()
                        .should('have.attr', 'style', 'top: 25px; font-size: 18px; font-weight: 400;')
                })
            })
        })

        context('Ввод значений', () => {
            context('Пустые поля', () => {
                context('E-mail', () => {
                    beforeEach(() => {
                        loginPage.form.btnSubmit.click()
                    })
                    it('Ошибки пустых полей', () => {
                        loginPage.form.email.errorHint().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(LoginLoc.EMAIL_ERROR_HINT)
                            })
                        loginPage.form.password.errorHint().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(LoginLoc.PASSWORD_ERROR_HINT)
                            })
                    })
                })
                context('Номер телефона', () => {
                    beforeEach(() => {
                        loginPage.form.radioBtnPhone().click()
                        loginPage.form.btnSubmit.click()
                    })
                    it('Ошибки пустых полей', () => {
                        loginPage.form.phone.errorHint().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(LoginLoc.PHONE_ERROR_HINT)
                            })
                        loginPage.form.password.errorHint().invoke('text')
                            .then((text) => {
                                expect(text).to.eq(LoginLoc.PASSWORD_ERROR_HINT)
                            })
                    })
                })
            })

            context('Невалидные данные', () => {
                context('E-mail', () => {
                    ['test', 'test@.com', '@', '+'].forEach((email: string) => {
                        it('Email', () => {
                            loginPage.form.email.setValue(email)
                            loginPage.form.password.setValue('123456Qwerty')
                            loginPage.form.btnSubmit.click()
                            loginPage.form.email.errorHint().invoke('text')
                                .then((text) => {
                                    expect(text).to.eq(LoginLoc.EMAIL_INCORRECT)
                                })
                        })
                    })
                })
                context('Номер телефона', () => {
                    ['1234567', '8123154455', '0000000', '3153141213'].forEach((phones: string) => {
                        it('Phone', () => {
                            loginPage.form.radioBtnPhone().click()
                            loginPage.form.phone.setValue(phones)
                            loginPage.form.password.setValue('123456Qwerty')
                            loginPage.form.btnSubmit.click()
                            loginPage.form.phone.errorHint().invoke('text')
                                .then((text) => {
                                    expect(text).to.eq(LoginLoc.PHONE_INCORRECT)
                                })
                        })
                    })
                })
            })

            context('Видимость пароля', () => {
                beforeEach(() => {
                    loginPage.form.password.setValue('123456Qwerty')
                })
                it('Отображаются точечки', () => {
                    loginPage.form.password.input()
                        .should('have.attr', 'type', 'password')
                })
                context('Кнопка видимости пароля', () => {
                    beforeEach(() => {
                        loginPage.form.password.clickBtnShowPass()
                    })
                    it('Отображается пароль', () => {
                        loginPage.form.password.input()
                            .should('have.attr', 'type', 'text')
                    })
                })
            })
        })

        context('Футер', () => {
            it('noAccount', () => {
                loginPage.footer.noAccountText().then((text) => {
                    expect(text).to.eq(LoginLoc.NO_ACCOUNT)
                })
            })
            it('Соц. сети', () => {
                loginPage.footer.socialNetworks.ok().should('be.visible')
                loginPage.footer.socialNetworks.vk().should('be.visible')
                loginPage.footer.socialNetworks.google().should('be.visible')
            })
            context('Зарегистрироваться', () => {
                beforeEach(() => {
                    loginPage.footer.btnRegistration().click()
                })
                it('Форма регистрации', () => {
                    regPage.form.container().should('be.visible')
                })
                it('Сохранение query params', () => {
                    cy.get('@query').then((query) => {
                        cy.location().should((location) => {
                            expect(location.href).to.eq(
                                endpoints.identity.redirection.registration(String(query))
                            )
                        })
                    })
                })
                context('Авторизация', () => {
                    beforeEach(() => {
                        regPage.footer.btnLogin().click()
                    })
                    it('Сохранение query params', () => {
                        cy.get('@query').then((query) => {
                            cy.location().should((location) => {
                                expect(location.href).to.eq(
                                    endpoints.identity.redirection.login(String(query))
                                )
                            })
                        })
                    })
                })
            })
            context('Восстановление пароля', () => {
                beforeEach(() => {
                    loginPage.footer.btnRecoveryPassword().click()
                })
                it('Форма восстановления пароля', () => {
                    recoveryPage.form.container().should('be.visible')
                })
                it('Сохранение query params', () => {
                    cy.get('@query').then((query) => {
                        cy.location().should((location) => {
                            expect(location.href).to.eq(
                                endpoints.identity.redirection.recovery(String(query))
                            )
                        })
                    })
                })
            })
        })
    })
})
