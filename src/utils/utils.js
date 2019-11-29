// 项目公共方法

/**
 * 获取URL参数
 * @param {String} name
 */
export function getUrlParam(name) {
  const reg = new RegExp(`[?&]${name}=([^&]*)(&|$)`);
  const result = reg.exec(window.location.href); // 对querystring匹配目标参数
  if (result != null) {
    return decodeURIComponent(result[1]);
  } else {
    return null;
  }
}