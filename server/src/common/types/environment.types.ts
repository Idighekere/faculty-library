export type IEnvironment = {
    APP: {
        PORT: number;
        ENV: string
        CLIENT: string
    },
    DB: {
        URI: string
    },
    JWT: {
        ACCESS_KEY: string
        REFRESH_KEY: string
        EXPIRES_IN: {
            ACCESS:string
            REFRESH: string

        }
    }
}
