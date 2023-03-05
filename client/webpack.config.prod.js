const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[fullhash].js',
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                router: () => 'http://localhost:5050',
            },
            'changeOrigin': true,
        },
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css'],
    },
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]-[hash][ext]',
                },
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.png',
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: '', // can modify `static` to another name or get it from `process`
        }),
    ],
};
