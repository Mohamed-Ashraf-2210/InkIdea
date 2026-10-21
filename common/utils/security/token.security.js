import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_EXPIERS_IN, ADMIN_ACCESS_TOKEN_SECRET_KEY, ADMIN_REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRES_IN, USER_ACCESS_TOKEN_SECRET_KEY, USER_REFRESH_TOKEN_SECRET_KEY } from "../../../config/config.service.js"
import { RoleEnum, TokenTypeEnum } from "../../enums/index.js"
import { BadRequestException, ConflictException, NotFoundException } from "../index.js"
import { findById } from "../../../src/db/index.js"

export const generateToken = ({ payload = {}, secret = USER_ACCESS_TOKEN_SECRET_KEY, options = {} } = {}) => {
    return jwt.sign(payload, secret, options)
}

export const verifyToken = ({ token, secret = USER_ACCESS_TOKEN_SECRET_KEY } = {}) => {
    return jwt.verify(token, secret)
}

const getTokenSecretKeyLevel = (roleLevel) => {
    switch (roleLevel) {
        case RoleEnum.USER:
            return {
                accessToken: USER_ACCESS_TOKEN_SECRET_KEY,
                refreshToken: USER_REFRESH_TOKEN_SECRET_KEY
            }
        default:
            return {
                accessToken: ADMIN_ACCESS_TOKEN_SECRET_KEY,
                refreshToken: ADMIN_REFRESH_TOKEN_SECRET_KEY
            }
    }
}

const getTokenSecretKey = ({ tokenType = TokenTypeEnum.ACCESS, roleLevel = RoleEnum.USER } = {}) => {
    const { accessToken, refreshToken } = getTokenSecretKeyLevel(roleLevel)
    let secretKey = undefined
    switch (tokenType) {
        case TokenTypeEnum.REFRESH: secretKey = refreshToken
            break
        default: secretKey = accessToken
            break
    }
    return secretKey
}

export const decodeToken = async ({ token = "", tokenType = TokenTypeEnum.ACCESS } = {}) => {
    const decode = jwt.decode(token)
    if (!decode?.aud) {
        throw BadRequestException({ message: "Not Found Token Audience" })
    }

    const [tokenApproach, roleLevel] = decode.aud || []
    if (tokenApproach != tokenType) {
        throw new ConflictException({ message: "Unexpected token mechanism" })
    }

    const secret = getTokenSecretKey({ tokenType: tokenApproach, roleLevel })

    const verifiedToken = verifyToken({ token, secret })

    const account = await findById({ id: verifiedToken.sub, model: UserModel })
    if (!account) {
        throw new NotFoundException({ message: "Not register account" })
    }
    return account
}

export const createLoginCredential = (user, issuer) => {
    const { accessToken, refreshToken } = getTokenSecretKeyLevel(user.role)
    const access_token = generateToken(
        {
            payload: {
                sub: user._id,
                extra: 250
            },
            secret: accessToken,
            options: {
                issuer,
                audience: [TokenTypeEnum.ACCESS, user.role],
                expiresIn: ACCESS_TOKEN_EXPIERS_IN
            }
        }
    )
    const refresh_token = generateToken(
        {
            payload: {
                sub: user._id,
                extra: 250
            },
            secret: refreshToken,
            options: {
                issuer,
                audience: [TokenTypeEnum.REFRESH, user.role],
                expiresIn: REFRESH_TOKEN_EXPIRES_IN
            }
        }
    )
    return { access_token, refresh_token }
}