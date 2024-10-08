import {Response, Request} from "express";
import {createUser, getUserByCredentials} from "../service/UsersServices";
import {generateToken} from "../util/authHelper";
import {QueryInterface, TUserSchema} from "../types/schemaTypes";

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const foundUser = await getUserByCredentials(email, password) as unknown as QueryInterface<TUserSchema>;
        const accessToken = generateToken({email, id: foundUser!._id});
        res.json({accessToken});
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).json({error: e.message});
        } else {
            res.status(400).json({error: "Login failed"});
        }
    }
};


export const signup = async (req: Request, res: Response) => {
    try {
        const {username, password, email} = req.body;
        const newUser = await createUser(username, password, email);
        const accessToken = generateToken({username, id: newUser._id});
    } catch (e) {
        res.status(400).json({error: "Signup Error"});
    }
};