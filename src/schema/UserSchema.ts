import isEmail from "validator/lib/isEmail";
import mongoose, {Model} from "mongoose";
import {TUserSchema} from "../types/schemaTypes";
import {checkPasswordStrength} from "../util/validationHelper";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema<TUserSchema>({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required."],
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [20, "Username must be at most 20 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
        validate: {
            validator: checkPasswordStrength,
        }
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        select: false,
        required: [true, "Email is required"],
        validator: {
            validator: isEmail,
            message: "Email is not valid"
        }
    }
});

type UserModel = Model<TUserSchema>;



userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt();
        // @ts-ignore
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as TUserSchema;
    return await bcrypt.compare(candidatePassword, user.password as string);
};

export const UserSchema = mongoose.model<TUserSchema, UserModel>("Users", userSchema);