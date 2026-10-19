import { Router } from "express";
import { successResponse } from "../../../common/utils/response/index.js"
import { login, signup } from "./auth.service.js";
const router = Router()

router.post("/signup", async (req, res) => {    
    const account = await signup(req.body)
    return successResponse({ res, message: "Created Account  successfully", status: 201, data: account })
})

router.post("/login", async(req, res) => {
    const user = await login(req.body)
    return successResponse({ res, message: "Login is success", status: 200, data: user }) 
})
export default router