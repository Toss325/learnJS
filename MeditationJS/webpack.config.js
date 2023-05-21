
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = (process.env.NODE_ENV === 'production');

const getCssLoader = () => isProd ? MiniCssExtractPlugin.loader : 'style-loader';

console.log('Loader: ', getCssLoader(), isProd);

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash:8].js',
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test:/\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',                   
                    'css-loader', 
                    'postcss-loader', 
                    'sass-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                filename: path.join('icons', '[name].[contenthash][ext]'),
                },
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            }),
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
};
