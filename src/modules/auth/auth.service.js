import { createLoginCredential, generateEncryption, generateHash, verifyPassword, ConflictException, NotFoundException } from "../../common/utils/index.js"
import { createUser, findUserByEmail } from "./auth.repository.js"

export const signup = async (input) => {
    const { name, email, password, phone, gender } = input

    const isEmailExist = await findUserByEmail({ email })
    if (isEmailExist) {
        throw ConflictException({ message: "Email is exist" })
    }


    const user = await createUser({
        name,
        email,
        password: await generateHash({ plaintext: password }),
        phone: generateEncryption(phone),
        gender
    })
    return user
}

export const login = async (input, issuer) => {
    const { email, password } = input
    const user = await findUserByEmail({ email, select: "+password" })
    if (!user) throw NotFoundException("Invalid Login")
    const isPasswordMatch = await verifyPassword({ plaintext: password, storedHash: user.password })
    if (!isPasswordMatch) NotFoundException("Invalid Login")
    return createLoginCredential(user, issuer)
}