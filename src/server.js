import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { config } from "../webpack.config.js";
//import { validateToken } from "./controllers/auth.js";

const app = express();
const compiler = webpack(config);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./public")));
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.get(["/", "/cart", "/login", "/signin"], (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get(
  ["/", "/checkout", "/cart", "/login", "/signin", "/orders"],

  (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  }
);

app.get(["/dashboard/product-add", "/dashboard/product-list"], (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});

app.get("/protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const validationResult = validateToken(token);

  if (!validationResult.success) {
    return res.status(403).json({ error: validationResult.error });
  }

  // Si la validación es exitosa, procede con la lógica de tu aplicación
  res.json({ message: "Acceso permitido", payload: validationResult.payload });
});

app.use(webpackHotMiddleware(compiler));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
