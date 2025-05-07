import jwt, { SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export const generateToken = (payload: object) => {
    const options: SignOptions = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, secret);
};