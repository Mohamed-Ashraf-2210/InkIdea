import crypto from "node:crypto"
import { ENC_SECRET_KEY, IV_LENGTH } from "../../../config/config.service.js"


const algorithm = "aes-256-cbc"

export const generateEncryption = (plaintext) => {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipherIV = crypto.createCipheriv(algorithm, ENC_SECRET_KEY, iv)
    let cipherText = cipherIV.update(plaintext, 'utf-8', 'hex')
    cipherText += cipherIV.final('hex')
    return `${iv.toString('hex')}:${cipherText}`
}

export const generateDecryption = (cipherText) => {
    if (!cipherText || typeof cipherText !== 'string') {
        throw ErrorException("Invalid encrypted data")
    }

    const [iv, encryptedData] = cipherText.split(":")
    if (!encryptedData) {
        throw ErrorException("Invalid encrypted data format")
    }
    if (iv.length != IV_LENGTH * 2) {
        throw ErrorException("Invalid iv")
    }
    const ivLikeBinary = Buffer.from(iv, 'hex')
    let decipherIV = crypto.createDecipheriv(algorithm, ENC_SECRET_KEY, ivLikeBinary)
    let plaintext = decipherIV.update(encryptedData, 'hex', 'utf-8')
    plaintext += decipherIV.final('utf-8')
    return plaintext
}