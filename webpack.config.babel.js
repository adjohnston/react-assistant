import { resolve } from "path";

export default {
  entry: resolve(__dirname, "src/index.js"),

  output: {
    filename: "react-assistant.js",
    path: resolve(__dirname, "dist"),
    library: "react-assistant",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },

  resolve: {
    alias: {
      src: resolve(__dirname, "src")
    }
  },

  externals: {
    react: 'react'
  }
};
