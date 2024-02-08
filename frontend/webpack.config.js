//webpack.config.js

const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, './../.env')
});

module.exports = (env, argv) => {
// module.exports = ({ mode } = { mode: "development" }) => {

    //const mode = argv.mode || 'development';
    //console.log(process.env);
    return {
        entry: path.resolve(__dirname, './src/index.tsx'),
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, './build'),
            publicPath: './build',
            filename: '[name].bundle.js',
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
        plugins: [ 
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname,'./public/index.html')
            }),
            new NodePolyfillPlugin({
                includeAliases: ['http','https','url','Buffer','process']
            }),
            new webpack.DefinePlugin({
                // "process.env": dotenv.parsed
                'process.env.REACT_PORT': JSON.stringify(process.env.REACT_PORT),
            }),
        ],
        devServer: {
            port: '3000',
            historyApiFallback: true,
            open: true,
            overlay: true
        }
    }   
}

//webpack.config.js

// const webpack = require("webpack")
// const path = require("path")
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// const dotenv = require('dotenv').config( {
//     path: path.join(__dirname, '../.env')
// });

// module.exports =  {

//     zmode: "development",
//     entry: path.resolve(__dirname, './src/index.tsx'),
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js'],
//     },
//     output: {
//         //path: path.resolve(__dirname,'..','build/'),
//         filename: 'bundle.js',
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(jpe?g|png|gif|svg)$/i,
//                 use: {
//                     loader: 'file-loader',
//                 }
//             },
//             {
//                 test:/\.(ts|js)x$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env', '@babel/preset-react','@babel/preset-typescript']
//                     }
//                 },
//             },
//             {
//                 test:/\.(css)$/i,
//                 use: ['style-loader','css-loader'],
//             }

//     ]},
//     plugins: [ 
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname,'./public/index.html')
//         }),
//         new NodePolyfillPlugin({
//             includeAliases: ['http','https','url','Buffer','process']
//         }),
//         new webpack.DefinePlugin({
//             "process.env": dotenv.parsed
//         }),
//     ],
//     devServer: {
//         port: process.env.REACT_PORT,
//         historyApiFallback: true
//     },   
// }