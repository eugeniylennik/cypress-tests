// ***********************************************************
// This example support/index.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands'
import { tQueryParams, tRegistration } from '../utils/types/identity.types'
import { tUserCredits } from '@data/types'
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

// Alternatively you can use CommonJS syntax:
// require('./commands')
/// <reference types="cypress" />

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            visitAccountLogin (params: tQueryParams, mobile?: boolean): Chainable
            visitRegistration (params: tQueryParams, mobile?: boolean): Chainable
            visitRecovery (params: tQueryParams, mobile?: boolean): Chainable
            authorize (params: tQueryParams, user: tUserCredits): Chainable
            registration (params: tQueryParams, user: tRegistration, options?: {
                isConfirmationNeeded: boolean
            }): Chainable
            matchImageSnapshot (snapshotName?: string, options?: Record<string, unknown>): void,
            repeatCode (params: tQueryParams, phoneOrEmail: string, countRepeat?: number): Chainable
        }
    }
}

addMatchImageSnapshotCommand({
    customSnapshotsDir: 'cypress/snapshots',
    failureThreshold: 0.05,
    failureThresholdType: 'percent',
    customDiffConfig: { threshold: 0.1 },
    capture: 'fullPage',
    disableTimersAndAnimations: false
})

Cypress.Commands.overwrite('matchImageSnapshot', (
    originalFn,
    snapshotName,
    options= {}
) => {
    if (Cypress.env('ALLOW_SCREENSHOT')) {
        originalFn(snapshotName, options)
    } else {
        cy.log('Screenshot comparison is disabled')
    }
})

beforeEach(() => {
    if (Cypress.env('IS_WHITE_HEADER')) {
        cy.intercept('**/*', (req) => {
            req.headers['X-RSV-STkn'] = Cypress.env('X-RSV-STkn')
        })
    }
})
