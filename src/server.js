import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { config } from "../webpack.config.js";
import { validateToken } from "./controllers/validateToken.js";

//import { getJWTHeaders } from "./controllers/getJWTHeaders.js";

const app = express();

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

  if (validationResult.payload.roleName === "admin") {
    res.sendFile(__dirname + "/public/dashboard.html");
  } else {
    res.status(403).send("Acceso no autorizado");
  }
};

const compiler = webpack(config);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./public")));
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(express.json());

app.get(["/", "/cart", "/login", "/signin"], (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get(
  ["/", "/checkout", "/cart", "/login", "/signin", "/orders"],

  (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  }
);

app.get(
  [
    "/dashboard/product-add",
    "/dashboard/product-list",
    "/dashboard/product-update?:id",
  ],
  getJWTHeaders
);

app.use(webpackHotMiddleware(compiler));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
