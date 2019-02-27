const path = require('path');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');

module.exports = {
  mode: dotenv.parsed.NODE_ENV,
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
    new CopyWebpackPlugin([
      {
        from: 'static',
        ignore: ['*.xlsx', '*.xls']
      }
    ])
  ],
  watchOptions: {
    poll: true
  }
};


const XLSX = require('xlsx');
const checksum = require('checksum');
const fs = require('fs');


var checkRebuild = new Promise((resolve, reject) => {
  let shouldRebuild = false;

  var cs = null;
  var dbcs = null;

  try {
    cs = fs.readFileSync('./dist/CHECKSUM', 'utf8');
    console.log("Database checksum file found: ", cs, "\n");
  } catch (err) {
    console.log("Database checksum file not found!\n");
    shouldRebuild = true;
  }
  
  try {
    checksum.file('./static/' + dotenv.parsed.DB, (err, sum) => {
      dbcs = sum;
      console.log("Checking actual database checksum ", dbcs, "\n");
      shouldRebuild = cs !== dbcs
    });
  } catch (err) {
    console.log("Database not found!", "\n");
    shouldRebuild = true;
  }

  resolve(shouldRebuild);
});

checkRebuild.then((shouldRebuild) => {
  if (shouldRebuild) {
    console.log("Database not found or outdated, rebuilding from source.\n");
    var wb = XLSX.readFile('./static/' + dotenv.parsed.DB_SRC);
  
    var db = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
  
    dbcs = checksum(db);
  
    console.log("Writing checksum", dbcs, "\n");
    fs.writeFileSync('./dist/CHECKSUM', dbcs);
    
    console.log("Writing database.\n")
    module.exports.plugins.push(
      new CreateFileWebpack({
        path: './static',
        fileName: dotenv.parsed.DB,
        content: db
      })
    )
  } else {
    console.log("Database is up to date.\n");
    console.log("To force rebuild the database, delete the CHECKSUM file in the `dist` folder.\n");
  }
});
