import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';
import {
  login,
  logout,
  loginV2,
  getUserInfoByToken,
  getUserInfo,
  getUserSites,
  updatePassword,
} from './mock/login';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';
const apiurl = 'http://192.168.1.204:8800';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /mock/CityServer/rest/omsService/user/login': login,
  'GET /mock/CityServer/rest/omsService/user/logout': logout,
  'GET /mock/CityServer/rest/omsService/user/getUserInfoByToken': getUserInfoByToken,
  'GET /mock/CityServer/rest/omsService/right/queryByUser': getUserSites,
  'GET /mock/CityServer/rest/omsService/user/updatePassWord': updatePassword,
  'GET /mock/ServiceEngine/rest/userService/login': loginV2,
  'GET /mock/ServiceEngine/rest/userService/getUserInfo': getUserInfo,

  'GET /mock/notices': getNotices,
};

export default (noProxy
  ? {
      'GET /api/(.*)': apiurl + '/api/',
      'POST /api/(.*)': apiurl + '/api/',
    }
  : delay(proxy, 1000));
