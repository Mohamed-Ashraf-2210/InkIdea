import { createLoginCredential } from "../../../common/utils/index.js"
import {generateDecryption} from "../../../common/utils/index.js"


export const profile = (user) => {
    user.phone = generateDecryption(user.phone)
    return user
}

export const rotateToken = async (user, issuer) => {
    return createLoginCredential(user, issuer)
}
