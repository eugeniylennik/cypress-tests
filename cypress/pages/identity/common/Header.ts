export default class Header {

    btnBack = ():Cypress.Chainable => cy.get('[data-testid="btn-back"]')

    txtBtnBack = (): Cypress.Chainable => cy.get('[data-testid="text-back"]').invoke('text')

    goBack = ():Cypress.Chainable => this.btnBack().click()

    getLogo = ():Cypress.Chainable => cy.get('[data-testid="logo"]')

    getImgLogo = ():Cypress.Chainable => this.getLogo().find('img[data-testid="img-logo"]')
}
