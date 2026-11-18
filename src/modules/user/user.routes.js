import { Router } from "express";
import { localFileUpload } from "../../common/utils/index.js"
import { authentication } from "../../middelware/index.js"
import { TokenTypeEnum } from "../../common/enums/index.js"
import { userProfileController, routateTokenController, uploadFileController } from "./user.controller.js"
const router = Router()

router.get("/profile",
    authentication(TokenTypeEnum.ACCESS),
    userProfileController
)

router.get("/rotate-token",
    authentication(TokenTypeEnum.REFRESH),
    routateTokenController
)

router.patch("/upload-file",
    authentication(TokenTypeEnum.ACCESS),
    localFileUpload({ customPath: "Icpc" }).single("attachment"),
    uploadFileController
)

export default router