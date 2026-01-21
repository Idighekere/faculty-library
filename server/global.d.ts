declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production";
        PORT: number;
        FRONTEND_URL: string
        MONGO_URI: string
        REFRESH_SECRET: string
        ACCESS_SECRET: string
        ACCESS_EXPIRES_IN: string
        REFRESH_EXPIRES_IN: string
        JWT_COOKIE_EXPIRES_IN: string

    }
}
