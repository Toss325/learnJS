const HtmlWebpackPlugin = require('html-webpack-plugin');
const { partialRight } = require('lodash');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;  
};

console.log('IS DEV:', isDev);

const filename = ext => isDev ? `[name].${ext}`: `[name].[hash:8].${ext}`;

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {              
      },            
    },  
    'css-loader'
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const babelOptions = preset => {
  const opts = {
      presets: ['@babel/preset-env']
    };
    if (preset) {
      opts.presets.push(preset);
    }
  return opts;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }];
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};



module.exports = {   
  //context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
      main: ['@babel/polyfill','./src/index.jsx'],
      analytics: './src/analytics.ts'
    },  
  output: {
      clean: true, // Clean the output directory before emit.
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist')
    },
  resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@models': path.resolve(__dirname, 'src/models/'),
        '@': path.resolve(__dirname, 'src'),
      },
    },  
  optimization: optimization(),
    devServer: {
      port: 4200,
      hot: isDev
    },
  devtool: isDev ? 'source-map' : '',
  plugins: [
      new HtmlWebpackPlugin({
      template: './src/index.html',
        minify: {
          collapseWhitespace: isProd,
        },
      }),
    new CopyWebpackPlugin({
      patterns: [
        {from: path.resolve(__dirname, './src/assets/favicon.ico'),
        to: path.resolve(__dirname, 'dist')},
      ],  
      }),
    new MiniCssExtractPlugin ({
        filename: filename('css')
      }) 
  ], 
   module: {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.less$/i,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/i,
        type: 'asset/resource',
        //use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'], 
        //type: 'asset/resource',    
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],    
      },  
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },  
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      },

      ]
    },  
   };
 
  
