import Joi from 'joi'
import { GenderEnum } from '../../common/enums/index.js'

export const signupSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(5)
        .max(50)
        .required(),
    email: Joi.string()
        .trim()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .required(),
    gender: Joi.string()
        .trim()
        .valid(...Object.values(GenderEnum))
        .default(GenderEnum.MALE),
    phone: Joi.string()
        .optional(),
    profilePicture: Joi.string()
        .uri()
        .optional()
})

export const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .required()
})