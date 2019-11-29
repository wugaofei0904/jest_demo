/**
 * 本文件对所有请求进行统一封装
 */
import Qs from 'qs';
import axios from 'axios';
import { Toast } from 'antd-mobile';

import apiUrl from './api';

// 添加一个返回拦截器 （于transformResponse之后处理）
// 返回的数据类型默认是json，若是其他类型（text）就会出现问题，因此用try,catch捕获异常
axios.interceptors.response.use(response => {
  return checkStatus(response);
}, error => {
  // 对返回的错误进行一些处理
  return Promise.reject(checkStatus(error.response));
});

function checkStatus(response) {
  Toast.hide();
  // 如果http状态码正常，则直接返回数据
  if (response) {
    const status = response.status;
    if ((status >= 200 && status < 300) || status === 304) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response.data;
    } else {
      let errorInfo = '';
      switch (status) {
        case -1:
          errorInfo = '远程服务响应失败,请稍后重试';
          break;
        case 400:
          errorInfo = '400: 错误请求';
          break;
        case 401:
          errorInfo = '401: 访问令牌无效或已过期';
          break;
        case 403:
          errorInfo = '403: 拒绝访问';
          break;
        case 404:
          errorInfo = '404：资源不存在';
          break;
        case 405:
          errorInfo = '405: 请求方法未允许'
          break;
        case 408:
          errorInfo = '408: 请求超时'
          break;
        case 500:
          errorInfo = '500：访问服务失败';
          break;
        case 501:
          errorInfo = '501：未实现';
          break;
        case 502:
          errorInfo = '502：无效网关';
          break;
        case 503:
          errorInfo = '503: 服务不可用'
          break;
        default:
          errorInfo = `连接错误`
      }
      return {
        status,
        msg: errorInfo
      }
    }
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

// 根据打包环境自动匹配请求地址
function autoMatchBaseUrl(prefix) {
  const { REACT_APP_STAGE } = process.env;
  const baseUrl = apiUrl[REACT_APP_STAGE][prefix];
  return baseUrl;
}

/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param timeout
 * @param data
 * @param prefix 用来辨别url地址
 * @param headers
 * @param dataType
 * @param loading 请求接口时是否显示loading动画
 * @returns {Promise.<T>}
 * @private
 */
export default function _Axios(url, {
  method = 'get',
  timeout = 10000,
  data = {},
  prefix = 'api',
  headers = {},
  dataType = 'json',
  loading = false,
  withCredentials = true
}) {
  const baseURL = autoMatchBaseUrl(prefix);
  const { REACT_APP_STAGE } = process.env;
  if (REACT_APP_STAGE === 'local') {
    url += '.json';
    // mock数据需使用get请求
    method = 'get';
  }

  headers = Object.assign(method === 'get' ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  } : {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, headers);

  const defaultConfig = {
    baseURL,
    url,
    method,
    params: data,
    data: data,
    timeout,
    headers,
    withCredentials,
    responseType: dataType
  };

  if (method === 'get') {
    delete defaultConfig.data;
  } else {
    delete defaultConfig.params;

    const contentType = headers['Content-Type'];

    if (typeof contentType !== 'undefined') {
      if (~contentType.indexOf('multipart')) {
        // 类型 `multipart/form-data;`
        defaultConfig.data = data;
      } else if (~contentType.indexOf('json')) {
        // 类型 `application/json`
        // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
        defaultConfig.data = JSON.stringify(data);
      } else {
        // 类型 `application/x-www-form-urlencoded`
        // 服务器收到的raw body(原始数据) name=homeway&key=nokey
        defaultConfig.data = Qs.stringify(data);
      }
    }
  }
  loading && Toast.loading('', 0);
  return axios(defaultConfig);
}
