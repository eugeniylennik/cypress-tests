import Header from '../../../../pages/identity/common/Header'
import LoginPage from '../../../../pages/identity/login/Login'
import RegistrationPage from '../../../../pages/identity/registration/Registration'
import { tQueryParams } from '../../../../utils/types/identity.types'
import { clients, studtrekClient } from '../../../../data/clients/clients'

describe('Студтрек client', () => {

    const header = new Header
    const loginPage = new LoginPage
    const regPage = new RegistrationPage

    const client: tQueryParams = clients(studtrekClient)

    beforeEach(() => {
        cy.visitAccountLogin(client)
    })

    it('Отсутствует хедер и кнопка Вернуться назад', () => {
        header.btnBack().should('not.exist')
    })

    it('Отображается логотип Студстрек', () => {
        header.getImgLogo().should('be.visible')
            .should('have.attr', 'src').then((href) => {
                expect(href).contain(client.client_id)
            })
    })

    it('Отображается форма авторизации', () => {
        loginPage.form.loginForm().should('be.visible')
    })

    it.skip('Отображается ссылка на форму Регистрации', () => {
        loginPage.footer.btnRegistration().should('be.visible')
    })

    context.skip('Форма зарегистрироваться', () => {
        beforeEach(() => {
            loginPage.footer.btnRegistration().click()
        })

        it('Отображение формы регистрации', () => {
            regPage.form.container().should('be.visible')
        })
    })

    it('Отображается ссылка на форму восстановления пароля', () => {
        loginPage.footer.btnRecoveryPassword().should('be.visible')
    })

    it('Отображение кнопок для авторизации через Соц. сети', () => {
        loginPage.footer.socialNetworks.ok().should('be.visible')
        loginPage.footer.socialNetworks.vk().should('be.visible')
        loginPage.footer.socialNetworks.google().should('be.visible')
    })

    it('Снапшот', () => {
        cy.matchImageSnapshot(`${client.client_id}`)
    })
})
