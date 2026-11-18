import { profile, rotateToken, profileImage } from "./user.service.js";
import { successResponse } from "../../common/utils/index.js"

export const userProfileController = async (req, res) => {
    const account = profile(req.user)
    return successResponse({ res, data: account })
}

export const routateTokenController = async (req, res) => {
    const issuer = `${req.protocol}//${req.host}`
    const credentials = await rotateToken(req.user, issuer)
    return successResponse({ res, data: credentials })
}

export const uploadFileController = async (req, res, next) => {
    const user = await profileImage(req.file, req.user)
    return successResponse({ res, data: user })
}