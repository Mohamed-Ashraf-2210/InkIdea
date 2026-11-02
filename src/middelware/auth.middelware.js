import { TokenTypeEnum } from '../../common/enums/index.js'
import {decodeToken} from "../../common/utils/index.js"

export const authentication = (tokenType = TokenTypeEnum.ACCESS) => {
    return async (req, _res, next) => {
        const authorization = req.headers.authorization
        const [bearer, token] = authorization.split(' ') || []
        if (bearer != "Bearer" || !token) {
            UnauthorizedException("Invaild Token")
        }
        req.user = await decodeToken({ token: token, tokenType })
        next()
    }
}