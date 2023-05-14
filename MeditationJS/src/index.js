import * as $ from 'jquery';
import Post from '@models/Post.js';
import json from './assets/json.json';
import WebpackLogo from './assets/webpack.png';
import xml from './assets/data.xml';
import csv from './assets/sample1.csv';
import './styles/styles.css';
import './styles/less.less';
import './styles/scss.scss';


const post = new Post('Webpack post title', WebpackLogo);

$('pre').addClass('code').html(post.toString());

console.log('Post to String', post.toString());

console.log('JSON:', json);

console.log('XML:', xml);

console.log('CSV:', csv);

