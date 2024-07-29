import {Request, Response} from "express";
import {TAuthenticatedUser} from "../types/authType";
import {getUserById} from "../service/UsersServices";
import {QueryInterface, TUserSchema} from "../types/schemaTypes";

export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const user = req.user as TAuthenticatedUser;
        const userInfo = await getUserById(user.id) as unknown as QueryInterface<TUserSchema>;
        res.status(200).json({id: userInfo._id, username: userInfo.username, email: userInfo.email});
    } catch (e) {
        if (e instanceof Error) {
            res.status(404).send({error: e.message});
        }
    }
};