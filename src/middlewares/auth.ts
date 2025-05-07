import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

 export const authenticateUser = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
 }