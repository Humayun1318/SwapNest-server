/* eslint-disable no-unused-vars */
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      } & JwtPayload;
    }
  }
}
