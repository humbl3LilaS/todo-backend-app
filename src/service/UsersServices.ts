import {UserSchema} from "../schema/UserSchema";

export const createUser = async (username: string, password: string, email: string) => {
    const user = new UserSchema({username, password, email});
    await user.save();
    return user;
};

export const getUserByCredentials = async (email: string, password: string) => {
    const user = await UserSchema.findOne({email});
    if (!user) {
        throw new Error("User not found");
    }
    // @ts-ignore
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Password is incorrect");
    }
    return user;
};