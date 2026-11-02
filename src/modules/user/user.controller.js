import { Router } from "express";
import { successResponse } from "../../../common/utils/index.js"
import { authentication } from "../../middelware/index.js"
import { TokenTypeEnum } from "../../../common/enums/index.js"
import { profile, rotateToken } from "./user.service.js";
const router = Router()

router.get("/profile",
    authentication(TokenTypeEnum.ACCESS),
    async (req, res) => {
        const account = profile(req.user)
        return successResponse({ res, data: account })
    }
)

router.get("/rotate-token",
    authentication(TokenTypeEnum.REFRESH),
    async (req, res) => {
        const issuer = `${req.protocol}//${req.host}`
        const credentials = await rotateToken(req.user, issuer)
        return successResponse({ res, data: credentials })
    }
)

export default router