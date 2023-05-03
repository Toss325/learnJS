const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {   
    entry: {
      vasia: './src/index.js',
    },
    output: {
        clean: true, // Clean the output directory before emit.
        filename: '[name].[hash].bundle.js',
      },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
    })],  
  };
