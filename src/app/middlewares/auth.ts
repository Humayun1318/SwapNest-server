import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import status from "http-status";

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new AppError(status.UNAUTHORIZED, "Token not provided");
      }

      jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
        if (err) {
          throw new AppError(status.UNAUTHORIZED, "Invalid token");
        }

        const payload = decoded as JwtPayload;
        // Ensure the payload has userId (regardless of email or phone login)
        if (!payload.userId || !payload.role) {
          throw new AppError(status.UNAUTHORIZED, "Invalid token payload");
        }

        // Check if the role is allowed
        if (requiredRoles.length > 0 && !requiredRoles.includes(payload.role)) {
          throw new AppError(
            status.FORBIDDEN,
            "AAccess denied: You do not have the permission for this action",
          );
        }

        // Attach decoded user info to request object
        req.user = {
          userId: payload.userId,
          role: payload.role,
        };

        next();
      });
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
