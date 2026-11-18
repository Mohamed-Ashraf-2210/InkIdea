import { Router } from "express";
import { vaildationMiddelware } from "../../middelware/index.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import { loginController, signupController } from "./auth.controller.js"
const router = Router()

router.post("/signup",
    vaildationMiddelware(signupSchema),
    signupController
)
router.post("/login",
    vaildationMiddelware(loginSchema),
    loginController
)
export default router