import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secret_key";

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
