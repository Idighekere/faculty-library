import { IUser } from "./user.types";
import { Require_id } from "mongoose";

export interface AuthenticateResult {
    currentUser: IUser;
    accessToken?: string;
}

export interface TokenPayload {
    id: string;
    iat?: number;
    exp?: number;
}

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}
