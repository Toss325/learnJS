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


module.exports = {   
  //context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './src/index.js',
    analytics: './src/analytics.js'
  },  
  output: {
      clean: true, // Clean the output directory before emit.
      filename: '[name].[contenthash].js',
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
      filename: '[name].[contenthash].css' 
    }) 
  ], 
   module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              
            },            
          },  
          'css-loader'
        ]
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
    ]
   } 
  };
  
