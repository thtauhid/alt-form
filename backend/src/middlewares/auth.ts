declare global {
  namespace Express {
    export interface Request {
      user: AuthUser;
    }
  }
}

import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { AuthUser } from "@/types";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({
      error: "Authorization token required.",
    });
  const token = authorization.split(" ")[1];

  try {
    if (!process.env.TOKEN_KEY) {
      throw new Error("Custom Error: 551, Token not found");
    }

    // Verify token
    const user = jwt.verify(token, process.env.TOKEN_KEY);

    // Insert user into request object
    req.user = user as AuthUser;

    // Move to next middleware
    next();
  } catch (error) {
    // TODO: in future need to be able to send the custom error code too
    res.status(401).json({ message: "Unable to authenticate user", error });
    return;
  }
};

export default auth;
