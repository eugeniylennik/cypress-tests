declare global {
    namespace NodeJS {
        interface ProcessEnv {
            IS_ENABLED_LOGS: boolean
        }
    }
}

export {}
