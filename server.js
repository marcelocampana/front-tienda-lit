// server.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { config } from "./webpack.config.js";
import { Sign } from "crypto";

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

app.get(["/", "/checkout", "/cart", "/sign-in"], (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get(["/dashboard/add-product", "/dashboard/list-product"], (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});

app.use(webpackHotMiddleware(compiler));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
