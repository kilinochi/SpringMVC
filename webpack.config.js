import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import babelLoaderOptions from './babel-loader.webpack.config';
import beautify from 'json-beautify';

import npmPackage from './package';
import projectConfig from './config/projectConfig';
import { Env } from './config/Env';

const rootPath = path.join(__dirname, 'src/main/resources');
const outputPath = path.join(rootPath, 'static');
const htmlPath = path.join(rootPath, 'templates');

const providedBuildEnv = process.env.BUILD_ENV || Env.DEVELOPMENT;

const BUILD_ENV = providedBuildEnv === Env.TEST ? Env.PRODUCTION : providedBuildEnv;
const DEV_MODE = BUILD_ENV === Env.DEVELOPMENT;


const BUILD_VERSION = npmPackage.version;


console.info(
    '\n\n\n--------------\n',
    'result project configuration is',
    '\n--------------\n',
    `BUILD_ENV: ${ BUILD_ENV }\n`,
    '\n--------------\n',
    beautify(projectConfig, null, 4, 16),
    '\n--------------\n\n\n',
);

export default {

    entry: {
        main: npmPackage.main,
    },

    target: 'web',

    output: {
        path: outputPath,
        filename: `js/[name].js`,
        publicPath: '/',
    },

    mode: BUILD_ENV,
    devtool: DEV_MODE ? 'source-map' : false,
    devServer: {
        port: projectConfig.devLocal.devServerPort,
        contentBase: outputPath,
        hot: DEV_MODE,
        historyApiFallback: true,
        watchContentBase: true,
    },

    optimization: {
        minimize: !DEV_MODE,
    },

    plugins: [
        new CaseSensitivePathsPlugin(),

        new webpack.LoaderOptionsPlugin({
            minimize: !DEV_MODE,
            debug: DEV_MODE,
        }),

        new webpack.DefinePlugin({
            DEV_MODE,
            'process.env.NODE_ENV': JSON.stringify(BUILD_ENV),
            'process.env.BROWSER': true,
        }),

        new CleanWebpackPlugin(
            [ outputPath ],
        ),

        new ExtractTextWebpackPlugin({
            disable: DEV_MODE,
            filename: `css/[name].css`,
        }),

        new CopyWebpackPlugin([
            {
                from: path.join(rootPath, 'webapp/images'),
                to: './images'
            },
        ]),

        // // index.html
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     templateParameters: {
        //         version: BUILD_VERSION,
        //     },
        //     template: path.join(htmlPath, 'index.html'),
        // }),

        ...DEV_MODE ? [

            new BundleAnalyzerPlugin({
                analyzerMode  : 'server',
                analyzerHost  : 'localhost',
                analyzerPort  : 12345,
                logLevel      : 'info',
                openAnalyzer  : false,
            }),

            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),

        ] : [
            new webpack.optimize.ModuleConcatenationPlugin(),
        ],

    ],

    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                include: path.join(rootPath, 'webapp'),
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: DEV_MODE,
                                url: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 10', 'last 4 version'],
                                    }),
                                ],
                                sourceMap: DEV_MODE,
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: DEV_MODE,
                            },
                        },
                    ],
                }),
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[hash].[ext]',
                    emitFile: false,
                },
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.join(rootPath, 'webapp'),
                use: {
                    loader: 'babel-loader',
                    options: babelLoaderOptions(DEV_MODE),
                },
            },
        ],
    },

    watchOptions: {
        aggregateTimeout: 100,
    },

    bail: !DEV_MODE,

    cache: DEV_MODE,

    stats: {
        colors: process.stdout.isTTY,
        reasons: DEV_MODE,
        hash: DEV_MODE,
        version: DEV_MODE,
        timings: true,
        chunks: DEV_MODE,
        chunkModules: DEV_MODE,
        cached: DEV_MODE,
        cachedAssets: DEV_MODE,
    },

}
