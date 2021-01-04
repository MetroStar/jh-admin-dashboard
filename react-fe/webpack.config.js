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
        filename: "admin-react.js",
        path: path.resolve(__dirname, "build"),
    },
    resolve: {
        extensions: [".css", ".js", ".jsx"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        port: 9000,
        before: (app, server) => {
            app.use(express.json())
            app.get("/hub/api/users", (req, res) => {
                res.set("Content-Type", "application/json").send('[{"kind":"user","name":"foo","admin":true,"groups":[],"server":"/user/foo/","pending":null,"created":"2020-12-07T18:46:27.112695Z","last_activity":"2020-12-07T21:00:33.336354Z","servers":{"":{"name":"","last_activity":"2020-12-07T20:58:02.437408Z","started":"2020-12-07T20:58:01.508266Z","pending":null,"ready":true,"state":{"pid":28085},"url":"/user/foo/","user_options":{},"progress_url":"/hub/api/users/foo/server/progress"}}},{"kind":"user","name":"bar","admin":false,"groups":[],"server":null,"pending":null,"created":"2020-12-07T18:46:27.115528Z","last_activity":"2020-12-07T20:43:51.013613Z","servers":{}}]')
            })
            app.get("/hub/api/groups", (req, res) => {
                res.set("Content-Type", "application/json").send('[{"kind":"group","name":"testgroup","users":[]}, {"kind":"group","name":"testgroup2","users":["foo", "bar"]}]')
            })
            app.post("/hub/api/groups/*", (req, res) => { console.log(req.body); res.status(200).end() })
            app.delete("/hub/api/groups/*", (req, res) => { console.log(req.body); res.status(200).end() })
            app.post("/hub/api/users", (req, res) => {console.log(req.body); res.status(200).end() })
        }
    }
}
