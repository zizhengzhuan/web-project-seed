import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';
import { login, logout, loginV2, getUserInfoByToken, getUserInfo } from './mock/login';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';
const apiurl = 'http://192.168.1.204:8800';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /api/CityServer/rest/omsService/user/login': login,
  'GET /api/CityServer/rest/omsService/user/logout': logout,
  'GET /api/CityServer/rest/omsService/user/getUserInfoByToken': getUserInfoByToken,
  'GET /api/ServiceEngine/rest/userService/login': loginV2,
  'GET /api/ServiceEngine/rest/userService/getUserInfo': getUserInfo,

  'GET /api/notices': getNotices,
};

export default (noProxy
  ? {
      'GET /api/(.*)': apiurl + '/api/',
      'POST /api/(.*)': apiurl + '/api/',
    }
  : delay(proxy, 1000));
