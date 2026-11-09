import { Router } from "express";
import { successResponse } from "../../common/utils/index.js"
import { login, signup } from "./auth.service.js";
import { vaildationMiddelware } from "../../middelware/index.js";
import { loginSchema, signupSchema } from "../../db/models/index.js";
const router = Router()

router.post("/signup",
    vaildationMiddelware(signupSchema),
    async (req, res) => {
        const account = await signup(req.body)
        return successResponse({ res, message: "Created Account  successfully", status: 201, data: account })
    })

router.post("/login",
    vaildationMiddelware(loginSchema),
    async (req, res) => {
        const issuer = `${req.protocol}//${req.host}`
        const user = await login(req.body, issuer)
        return successResponse({ res, message: "Login is success", status: 200, data: user })
    })
export default router