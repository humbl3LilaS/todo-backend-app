import jwt from "jsonwebtoken";


export function generateToken(data: any) {
    // @ts-ignore
    return jwt.sign({data}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

