import { validateToken } from "./validateToken.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* import express from "express";
const app = express();
app.use(express.static(path.join(__dirname, "./public"))); */

export const getJWTHeaders = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  const validationResult = validateToken(token);

  if (!validationResult.success) {
    return res.status(403).json({ error: validationResult.error });
  }

  console.log({
    message: "Acceso permitido",
    payload: validationResult.payload,
  });

  res.sendFile(__dirname + "/public/index.html");
};
