/**
 * 项目API地址配置
 * 
 * 展示文件为常用四个环境等API地址配置，可根据实际情况扩展（扩展时须跟package.json重的打包命令保持一致）
 * 展示文件为每个环境提供了多个环境地址，以应对项目多个服务等情况，可根据实际情况修改
 */
const apiUrl = {
  // 本地mock地址
  local: {
    api: '../mock',
    ucenter: '../mock'
  },
  // 开发联调地址
  dev: {
    api: 'http://192.168.44.98:9010',
    ucenter: 'http://192.168.44.98:9010',
  },
  // 测试环境地址
  test: {
    api: 'http://192.168.44.98:9010',
    ucenter: 'http://192.168.44.98:9010',
  },
  // 生产环境地址
  prod: {
    api: 'http://192.168.44.98:9010',
    ucenter: 'http://192.168.44.98:9010',
  },
};

export default apiUrl;