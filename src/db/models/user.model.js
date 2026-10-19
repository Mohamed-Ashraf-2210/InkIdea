import mongoose from "mongoose";
import { GenderEnum, RoleEnum } from "../../../common/enums/index.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: Object.values(GenderEnum),
        default: GenderEnum.MALE
    },
    role: {
        type: Number,
        enum: Object.values(RoleEnum),
        default: RoleEnum.USER
    },
    phone: String,
    profilePicture: String,
}, {
    timestamps: true,
    collection: "Users",
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true
})

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema)