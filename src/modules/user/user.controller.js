import { Router } from "express";
import { localFileUpload, successResponse } from "../../common/utils/index.js"
import { authentication } from "../../middelware/index.js"
import { TokenTypeEnum } from "../../common/enums/index.js"
import { profile, rotateToken, profileImage } from "./user.service.js";
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

router.patch("/upload-file",
    authentication(TokenTypeEnum.ACCESS),
    localFileUpload({ customPath: "Icpc" }).single("attachment"),
    async (req, res, next) => {
        const user = await profileImage(req.file, req.user)
        return successResponse({ res, data: user })
    })

export default router