import { successResponse } from "../../common/utils/index.js"
import { login, signup } from "./auth.service.js";

export const signupController = async (req, res) => {
    const account = await signup(req.body)
    return successResponse({ res, message: "Created Account  successfully", status: 201, data: account })
}

export const loginController = async (req, res) => {
    const issuer = `${req.protocol}//${req.host}`
    const user = await login(req.body, issuer)
    return successResponse({ res, message: "Login is success", status: 200, data: user })
}