Cypress.Commands.overwrite(
    'request',
    (originalFn, ...options) => {
        const optionsObject = options[0]

        if (optionsObject === Object(optionsObject)) {
            optionsObject.headers = {
                'X-RSV-STkn': Cypress.env('WHITE_HEADER'),
                ...optionsObject.headers
            }

            return originalFn(optionsObject)
        }

        return originalFn(...options)
    }
)
