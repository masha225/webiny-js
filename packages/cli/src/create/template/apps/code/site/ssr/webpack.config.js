const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: path.resolve("ssr", "handler.js"),
    output: {
        filename: "ssr.js",
        path: path.resolve("build"),
        libraryTarget: "commonjs"
    },
    resolve: {
        alias: {
            webfontloader: "null-loader",
            "react-spinner-material": "null-loader"
        },
        extensions: [".js", ".json", ".jsx", ".mjs"]
    },
    target: "node",
    node: {
        __dirname: false
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.REACT_APP_API_ENDPOINT": JSON.stringify(
                process.env.REACT_APP_API_ENDPOINT
            ),
            "process.env.REACT_APP_ENV": JSON.stringify(process.env.REACT_APP_ENV || "browser"),
            "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL)
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                exclude: [/\.mjs$/, /\.js$/, /\.html$/, /\.json$/],
                loader: "file-loader",
                options: {
                    name: "static/media/[name].[hash:8].[ext]",
                    publicPath: process.env.PUBLIC_URL,
                    emitFile: false
                }
            }
        ]
    }
};
