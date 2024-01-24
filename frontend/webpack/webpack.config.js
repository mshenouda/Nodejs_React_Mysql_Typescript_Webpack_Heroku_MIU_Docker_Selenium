//webpack.config.js

const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    mode: "development",
    entry: path.resolve(__dirname, '..','src/index.tsx'),
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: {
                    loader: 'file-loader',
                }
            },
            {
                test:/\.(ts|js)x$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react','@babel/preset-typescript']
                    }
                },
            },
            {
                test:/\.(css)$/i,
                use: ['style-loader','css-loader'],
            }

    ]},
    plugins: [ new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'..','./public/index.html')
    })],
    devServer: {
        port: 3000,
    },
}

