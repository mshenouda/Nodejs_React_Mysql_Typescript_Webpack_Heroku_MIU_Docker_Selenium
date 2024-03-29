//webpack.config.js

const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, './../.env')
});

module.exports = (env, argv) => {

    const mode = argv.mode || 'development';
    return {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            //publicPath: '/',
            path: `${__dirname}/public`,
            filename: '[name].bundle.js',
            clean: true,
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
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                "projectReferences": true,
                                compilerOptions: {
                                    noEmit: false,
                                },
                            },
                        }
                    ]
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
        plugins: [ 
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname,'./public/index.html'),
                filename: './index.html',
                favicon: './public/favicon.ico'
            }),
            new NodePolyfillPlugin({
                includeAliases: ['http','https','url','Buffer','process']
            }),
            new webpack.DefinePlugin({
                'process.env.REACT_PORT': JSON.stringify(process.env.REACT_PORT),
                'process.env.REACT_APP_SERVER_PORT': JSON.stringify(process.env.REACT_APP_SERVER_PORT),
                'process.env.REACT_APP_HOST': JSON.stringify(process.env.REACT_APP_HOST),
                'process.env.MYSQL_HOST': JSON.stringify(process.env.MYSQL_HOST),
                'process.env.MYSQL_USER': JSON.stringify(process.env.MYSQL_USER),
                'process.env.MYSQL_PORT': JSON.stringify(process.env.MYSQL_PORT),
                'process.env.MYSQL_PASSWORD': JSON.stringify(process.env.MYSQL_PASSWORD),
                'process.env.MYSQL_DATABASE': JSON.stringify(process.env.MYSQL_DATABASE),               
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, "public"),
            },
            port: process.env.REACT_PORT,
            historyApiFallback: true,
        },
        devtool: 'inline-source-map',
    }   
}
