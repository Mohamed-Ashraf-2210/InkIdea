import { hash, compare, genSalt } from 'bcrypt'
import { SALT_ROUND } from '../../../config/config.service.js'

export const generateHash = async ({ plaintext, saltRounds = SALT_ROUND, minor = 'b' }) => {
    const generatedSalt = await genSalt(saltRounds, minor)
    const hashedPassword = await hash(plaintext, generatedSalt)
    return hashedPassword
}

export const verifyPassword = async ({ plaintext, storedHash }) => {
    const isMatch = await compare(plaintext, storedHash)
    return isMatch
}
