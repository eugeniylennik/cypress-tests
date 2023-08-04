/* eslint-disable */
// @ts-nocheck
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.ts can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import { environment } from '@data/environment'
import { getDomain } from '@data/domains'
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    // we register our plugin using its register method:
    addMatchImageSnapshotPlugin(on, config)
    on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
            launchOptions.args.push('--force-color-profile=srgb');
            launchOptions.args.push('--force-device-scale-factor=2');
        }
    })
    
    Object.assign(config, {
        queryAttempts: 2,
        baseUrl: getDomain('web', environment),
        ...config.baseUrl
    })
    return config
}
