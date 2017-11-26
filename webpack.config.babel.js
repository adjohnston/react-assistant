import { resolve } from "path";

export default {
  entry: resolve(__dirname, "src/index.js"),

  output: {
    filename: "speech-recognition.js",
    path: resolve(__dirname, "dist"),
    library: "speechRecognition",
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
