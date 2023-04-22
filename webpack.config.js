import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
//import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
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
    ],
  },
  resolve: {
    fallback: {
      stream: path.resolve(__dirname, "node_modules/stream-browserify"),
      crypto: path.resolve(__dirname, "node_modules/crypto-browserify"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        PASSWORD_KEY: JSON.stringify(process.env.PASSWORD_KEY),
        SECRET_KEY: JSON.stringify(process.env.SECRET_KEY),
        API_HOSTNAME: JSON.stringify(process.env.API_HOSTNAME),
      },
    }),
  ],
};
