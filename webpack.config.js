const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin");


const path = require('path');
const glob = require('glob');

const PATH = {
    dev: {
        source: 'src',
        scripts: 'src/js',
        styles: 'src/styles',
        assets: 'src/assets',
    },
    pub: {
        source: 'dist',
        scripts: 'dist/js',
        styles: 'dist/styles',
        assets: 'dist/assets',
    },
};

const PATH_DEV = path.resolve(__dirname, PATH.dev.source);
const PATH_PUB = path.resolve(__dirname, PATH.pub.source);


const config = {

    entry: {
        'js/App': './src/js/App.js',
        'js/pages/main': './src/js/pages/main.js',
        'js/pages/about': './src/js/pages/about.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: './',

    },
        plugins: [

        new CopyPlugin({
          patterns: [
                { from: 'pages', to: PATH_PUB },
                { from: PATH.dev.assets, to: PATH_PUB + '/assets' },
          ],
        }),

        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        ],

        resolve: {
            alias: {
                SCSS: path.resolve(PATH.dev.styles),
                SCRIPTS: path.resolve(PATH.dev.scripts),
            },
            extensions: ['.js'],
        },


    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        allowedHosts: [
          'host.com',
          'subdomain.host.com',
          'subdomain2.host.com',
          'host2.com',
        ],
    },


    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // CSS, PostCSS, Sass
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            // Извлекает CSS в отдельные файлы. Создает CSS-файл для каждого JS-файла, который содержит CSS
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },

        ],
    }
}

module.exports = config;
