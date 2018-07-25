import { http } from 'yc';
import request from '../utils/request';
import { getSys, getInit, getCfgByKey } from '../utils/sysConfig';
import { getToken, getItem, setItem } from '../utils/authority';

const {
  base: { get1 },
  getUrl,
  get,
} = http;
const sys = getSys();

function getOmsVersion() {
  const taskServices = getCfgByKey('servicecfg');
  const tmp = taskServices.service.filter(item => item.name === 'OMS_SVR');
  if (tmp.length !== 1) {
    throw new Error('taskServices.js 配置中缺少 OMS_SVR 节点配置信息');
  }
  const omsService = tmp[0].url;
  if (omsService.indexOf('userService') > -1) {
    return 2;
  }
  if (omsService.indexOf('us') > -1) {
    console.log('暂不支持 1.0 版 oms');
    return 1;
  }
  return 3;
}

const omsVersion = getOmsVersion();

/**
 * 针对 oms 2.1 版本的登陆服务
 * @param params
 * @return {Promise<void>}
 */
async function loginV2(params) {
  const { password, loginName: userName } = params;
  const res = await get({
    svn: 'OMS_SVR',
    path: 'login',
    data: { password, username: userName, sys },
  });
  if (res.isSuccess) {
    setItem('username', res.user.username);
    res.data = {
      token: 'IAmToken',
    };
    return res;
  }
  return null;
}

/**
 * 针对 oms 2.1 版本的登出服务
 * @param params
 * @return {Promise<void>}
 */
async function logoutV2() {
  return new Promise(resolve => {
    resolve('success');
  });
}

async function loginV3(params) {
  const { password, loginName } = params;
  return get({
    svn: 'OMS_SVR',
    path: 'user/login',
    data: { password, loginName, sys },
  });
}

async function logoutV3() {
  return get({
    svn: 'OMS_SVR',
    path: 'user/logout',
    data: { sys },
  });
}

/**
 * 针对 oms 2.1 版本的登出服务
 * @param params
 * @return {Promise<void>}
 */
async function getUserInfoV2() {
  const username = getItem('username');
  const res = await get({
    svn: 'OMS_SVR',
    path: 'getUserInfo',
    data: { username, sys },
  });
  if (res.isSuccess) {
    return {
      data: {
        user: res.user,
      },
    };
  }
  return null;
}

async function getUserInfoV3() {
  return get({
    svn: 'OMS_SVR',
    path: 'user/getUserInfoByToken',
    data: { sys },
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function accountLogin(params) {
  if (omsVersion === 2) {
    return loginV2(params);
  }
  return loginV3(params);
}

export async function accountLogout() {
  if (omsVersion === 2) {
    return logoutV2();
  }
  return logoutV3();
}

export async function queryCurrent() {
  if (omsVersion === 2) {
    return getUserInfoV2();
  }
  return getUserInfoV3();
}

export function getUserInfoSync() {
  if (omsVersion === 2) {
    return null;
  }
  const token = getToken();
  const url = getUrl({
    svn: 'OMS_SVR',
    path: 'user/getUserInfoByToken',
  });
  const resultStr = get1(url, {
    sys,
    token,
  });
  try {
    const res = JSON.parse(resultStr);
    return res;
  } catch (err) {
    console.error(err);
  }
  return null;
}
