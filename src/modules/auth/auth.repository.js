import { create, findOne, UserModel } from "../../db/index.js"

export const findUserByEmail = async ({ email, select = "" } = {}) => {
    return findOne({
        filter: { email },
        select,
        model: UserModel
    })
}

export const createUser = async (data) => {
    return create({
        data,
        model: UserModel
    })
}