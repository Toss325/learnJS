const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
        }),
    ],
};