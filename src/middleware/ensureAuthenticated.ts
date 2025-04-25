import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret_key";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token is missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded as any;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
