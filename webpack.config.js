import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
//import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  stats: {
    assets: true,
  },
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      /*    {
        test: /\.css$/i,
        use: [{ loader: "lit-css-loader" }, { loader: "css-loader" }],
      }, */
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
