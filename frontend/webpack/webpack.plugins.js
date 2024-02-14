const webpack = require('webpack');
const { inDev } = require('./webpack.helpers');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  inDev() && new webpack.HotModuleReplacementPlugin(),
  inDev() && new ReactRefreshWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash].css',
    chunkFilename: '[name].[chunkhash].chunk.css',
  }),
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env.REACT_PORT': JSON.stringify(process.env.REACT_PORT),
    'process.env.MYSQL_HOST': JSON.stringify(process.env.MYSQL_HOST),
    'process.env.HOST': JSON.stringify(process.env.HOST),
    'process.env.MYSQL_ROOT_PASSWORD': JSON.stringify(process.env.MYSQL_ROOT_PASSWORD),
    'process.env.MYSQL_USER': JSON.stringify(process.env.MYSQL_USER),
    'process.env.MYSQL_ROOT': JSON.stringify(process.env.MYSQL_ROOT),
    'process.env.MYSQL_PORT': JSON.stringify(process.env.MYSQL_PORT),
    'process.env.MYSQL_PASSWORD': JSON.stringify(process.env.MYSQL_PASSWORD),
    'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),
    'process.env.MYSQL_DATABASE': JSON.stringify(process.env.MYSQL_DATABASE),    
  })
].filter(Boolean);
