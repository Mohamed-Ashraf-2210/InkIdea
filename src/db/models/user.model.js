import mongoose from "mongoose";
import { GenderEnum, RoleEnum } from "../../common/enums/index.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    gender: {
        type: String,
        enum: Object.values(GenderEnum),
        default: GenderEnum.MALE
    },
    role: {
        type: String,
        enum: Object.values(RoleEnum),
        default: RoleEnum.USER
    },
    phone: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: "Users",
    strict: true,
    strictQuery: true,
    optimisticConcurrency: true
})

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema)