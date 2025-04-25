// import { Router } from "express";
// import bcrypt from "bcryptjs";
// import { generateToken } from "../utils/auth/jwt";

// const authRoutes = Router();

// authRoutes.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (email !== "admin@example.com") {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   const valid = await bcrypt.compare(password, "$2a$10$hashedPasswordExample");

//   if (!valid) {
//     return res.status(401).json({ error: "Invalid password" });
//   }

//   const token = generateToken({ email });
//   return res.json({ token });
// });

// export default authRoutes;
