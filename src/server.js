import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { config } from "../webpack.config.js";
import jwt from "jsonwebtoken";

const app = express();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // return res.status(401).send({ message: "No token provided" });
    return res.redirect("/login");
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ message: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Token malformatted" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      //return res.status(401).send({ message: "Invalid token" });
      return res.redirect("/login");
    }

    // req.userId = decoded.id;
    return next();
  });
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
    "/dashboard/product-list",
    "/dashboard/product-add",
    "/dashboard/product-update?:id",
  ],
  authMiddleware,
  (req, res) => {
    res.sendFile(__dirname + "/public/dashboard.html");
  }
);

app.get(
  "/dashboard",

  authMiddleware,
  (req, res) => {
    res.redirect("/dashboard/product-list");
  }
);

app.use(webpackHotMiddleware(compiler));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
