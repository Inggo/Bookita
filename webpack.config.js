const path = require('path');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');

const XLSX = require('xlsx');

module.exports = env => {
  return {
    mode: env.NODE_ENV,
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        'vue': 'vue/dist/vue.common.js',
        'src': path.resolve(__dirname, '../src'),
        'assets': path.resolve(__dirname, '../src/assets'),
        'components': path.resolve(__dirname, '../src/components')
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.xls.?$/,
          loader: 'excel-loader'
        }
      ]
    },
    plugins: [
      new Dotenv(),
      new ExtractTextPlugin('style.css'),
      new HtmlWebpackPlugin({
        template: './src/index.ejs',
        inject: 'body'
      }),
      new VueLoaderPlugin(),
      new CreateFileWebpack({
        path: './static',
        fileName: dotenv.parsed.DB,
        content: './static/' + dotenv.parsed.DB_SRC
      }),
      new CopyWebpackPlugin([
        { from: 'static' }
      ])
    ],
    watchOptions: {
      poll: true
    }
  };  
};
