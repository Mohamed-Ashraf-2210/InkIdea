import { generateEncryption, generateHash, verifyPassword, ConflictException, NotFoundException } from "../../../common/utils/index.js"
import { create, findOne, UserModel } from "../../db/index.js"

export const signup = async (input) => {
    const { name, email, password, phone, gender } = input

    const isEmailExist = await findOne({
        filter: { email },
        model: UserModel
    })
    if (isEmailExist) {
        return ConflictException({ message: "Email is exist" })
    }


    const user = await create({
        data: {
            name,
            email,
            password: await generateHash({ plaintext: password }),
            phone: generateEncryption(phone),
            gender
        },
        model: UserModel
    })
    return user
}

export const login = async (input) => {
    const { email, password } = input
    const user = await findOne({
        filter: { email },
        model: UserModel
    })
    if (!user) NotFoundException("Invalid Login")

    const isPasswordMatch = await verifyPassword({ plaintext: password, storedHash: user.password })
    if (!isPasswordMatch) NotFoundException("Invalid Login")
    return user
}