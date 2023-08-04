type tOptions<T> = {
	check?: (value: T | Cypress.Response<T>) => boolean;
	attemptsLeft?: number;
	delay?: number;
}

export function retryUntil<T>(
    task: (() => Promise<T>) | (() => Cypress.Chainable),
    options: tOptions<T> = {}
): Promise<T | undefined> | Cypress.Chainable {
    const {
        check = Boolean,
        attemptsLeft = 10,
        delay = 1000
    } = options

    if (attemptsLeft <= 0) {
        throw new Error('No attempts left')
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return task().then((value: Cypress.Response<T> | T) => {
        if (!check(value)) {
            return cy
                .wait(delay)
                .then(() => retryUntil(task, { ...options, attemptsLeft: attemptsLeft - 1, delay: delay * 1.5 }))
        }
        return Promise.resolve(value)
    })
}
