import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload, Secret} from "jsonwebtoken";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authentication as string;
    if (!token) {
        res.status(401).json({error: "No token provided"});
        return;
    }
    try {
        const accessToken = token.split(" ")[1];
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as Secret);
        // @ts-ignore
        req.user = decoded.data;
        next();
    } catch (e) {
        res.status(401).json({error: "Invalid Token"});
    }
};