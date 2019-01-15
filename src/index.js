import './index.less'
import './index2.css'
import {setCookie} from 'utils'

var src = require('./img/1.png')
console.log(1)

var img = document.createElement('img')
img.src = src;
document.querySelector('body').appendChild(img);

setCookie('test-webpack',new Date().getMinutes());