import baseUrls from '@api/base.urls'

export function visitAsync(urlEnding: string): void {
    const pageUrl = Cypress.config().baseUrl + urlEnding
    cy.visit(pageUrl)
}

export function visitIdentityPage(urlEnding: string): void {
    cy.visit(`${baseUrls.identity.url}${urlEnding}`)
}
