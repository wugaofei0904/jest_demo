import ReactDOM from 'react-dom';
import Router from './utils/router';
import FastClick from 'fastclick';
import VConsole from 'vconsole';
import 'lib-flexible';

import './index.less';

const { REACT_APP_STAGE } = process.env;
if (REACT_APP_STAGE === 'local' || REACT_APP_STAGE === 'dev') {
  // 当未本地或开发环境时，打开移动端调试工具
  new VConsole();
}
// 引入fastclick解决移动端点击时间延时，以及touch穿透问题
FastClick.attach(document.body);

ReactDOM.render(Router, document.getElementById('root'));
