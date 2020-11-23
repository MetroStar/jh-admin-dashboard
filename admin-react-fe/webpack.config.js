const webpack = require("webpack")
const path = require("path")
const express = require("express")

module.exports = {
    entry: path.resolve(__dirname, "src", "App.jsx"),
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.(css)/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|ttf)$/i,
                exclude: /node_modules/,
                use: "file-loader"
            }
        ]
    },
    output: {
        publicPath: "/",
        filename: "admin.fe.js",
        path: path.resolve(__dirname, "build")
    },
    resolve: {
        extensions: [".css", ".js", ".jsx"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        port: 8000,
        before: (app, server) => {
            // app.use(express.json())
        }
    }
}