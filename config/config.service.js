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