import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  mode: "development",
  entry: "./src/main.js",
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
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        API_HOSTNAME: JSON.stringify(process.env.API_HOSTNAME),
        API_AUTH_HOSTNAME: JSON.stringify(process.env.API_AUTH_HOSTNAME),
      },
    }),
  ],
};
