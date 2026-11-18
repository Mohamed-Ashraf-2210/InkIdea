import { BadRequestException } from "../common/utils/index.js"

export const vaildationMiddelware = (schema) => {
    return (req, _res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false
        })
        if (error) throw BadRequestException({ message: "Validation Error" })
        req.body = value
        next()
    }
}