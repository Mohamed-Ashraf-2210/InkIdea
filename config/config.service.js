import { config } from "dotenv";
import { resolve } from "node:path"

export const NODE_ENV = process.env.NODE_ENV ?? "development"

const envPath = {
    development: ".env.development",
    production: ".env.production"
}
config({ path: resolve(`./config/${envPath[NODE_ENV]}`) })

export const PORT = process.env.PORT ?? 9900
export const DB_URI = process.env.DB_URI

export const SALT_ROUND = parseInt(process.env.SALT_ROUND ?? 12)


export const IV_LENGTH = parseInt(process.env.IV_LENGTH ?? '16')
export const ENC_SECRET_KEY = Buffer.from(process.env.ENC_SECRET_KEY)

export const USER_ACCESS_TOKEN_SECRET_KEY = process.env.USER_ACCESS_TOKEN_SECRET_KEY
export const ADMIN_ACCESS_TOKEN_SECRET_KEY = process.env.ADMIN_ACCESS_TOKEN_SECRET_KEY
export const USER_REFRESH_TOKEN_SECRET_KEY = process.env.USER_REFRESH_TOKEN_SECRET_KEY
export const ADMIN_REFRESH_TOKEN_SECRET_KEY = process.env.ADMIN_REFRESH_TOKEN_SECRET_KEY
export const ACCESS_TOKEN_EXPIERS_IN = process.env.ACCESS_TOKEN_EXPIERS_IN
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN