import { http } from 'yc';
import request from '../utils/request';
import { getSys, getCfgByKey } from '../utils/sysConfig';
import { getToken, getItem, setItem } from '../utils/authority';

const {
  base: { get1 },
  getUrl,
  get,
} = http;
const sys = getSys();

let omsVersion = -1;

export function getOmsVersion() {
  if (omsVersion !== -1) {
    return omsVersion;
  }
  const taskServices = getCfgByKey('servicecfg');
  const tmp = taskServices.service.filter(item => item.name === 'OMS_SVR');
  if (tmp.length !== 1) {
    throw new Error('taskServices.js 配置中缺少 OMS_SVR 节点配置信息');
  }
  const omsService = tmp[0].url;
  if (omsService.indexOf('userService') > -1) {
    omsVersion = 2;
  } else if (omsService.indexOf('us') > -1) {
    console.log('暂不支持 1.0 版 oms');
    omsVersion = 1;
  } else {
    omsVersion = 3;
  }
  return omsVersion;
}

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
  if (res && res.isSuccess) {
    setItem('username', res.user.username);
    res.data = {
      token: 'i am token',
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
  if (typeof username !== 'string' || (typeof username === 'string' && username.length === 0)) {
    return null;
  }
  const res = await get({
    svn: 'OMS_SVR',
    path: 'getUserInfo',
    data: { username, sys },
  });
  if (res && res.isSuccess) {
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

async function getUserSitesV2() {
  return [];
}

/**
 * 获取登录用户的站点
 * @param params
 * @returns {Promise<*>}
 */
async function getUserSitesV3(params) {
  const res = await get({
    svn: 'OMS_SVR',
    path: 'right/queryByUser',
    data: params,
  });
  if (res && res.msgCode !== -1) {
    return res.data;
  }
  // 获取失败
  return [];
}

/**
 * 修改密码，对接 oms2
 */
async function updatePasswordV2() {
  return true;
}

/**
 * 修改密码，对接 oms3
 *
 * @param {object} params - 参数
 * @param {int} params.uid - 用户标示
 * @param {string} params.loginName - 用户名称
 * @param {string} params.oldpsw - 老密码
 * @param {string} params.newpsw - 新密码
 */
async function updatePasswordV3(params) {
  const response = await get({
    svn: 'OMS_SVR',
    path: 'user/updatePassWord',
    data: params,
  });
  if (response.msgCode !== 0) {
    return false;
  }
  // 获取失败
  return true;
}

export async function queryNotices() {
  return request('/mock/notices');
}

export async function accountLogin(params) {
  if (getOmsVersion() === 2) {
    return loginV2(params);
  }
  return loginV3(params);
}

export async function accountLogout() {
  if (getOmsVersion() === 2) {
    return logoutV2();
  }
  return logoutV3();
}

export async function queryCurrent() {
  if (getOmsVersion() === 2) {
    return getUserInfoV2();
  }
  return getUserInfoV3();
}

export function getUserInfoSync() {
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

/**
 * 对接 oms 2.0 版本
 */
export function getUserInfoSyncV2() {
  const username = getItem('username');
  if (typeof username !== 'string' || (typeof username === 'string' && username.length === 0)) {
    return null;
  }
  const url = getUrl({
    svn: 'OMS_SVR',
    path: 'getUserInfo',
  });
  const resultStr = get1(url, { username, sys });
  try {
    const res = JSON.parse(resultStr);
    return res;
  } catch (err) {
    console.error(err);
  }
  return null;
}

export function getUserSites(params) {
  if (getOmsVersion() === 2) {
    return getUserSitesV2(params);
  }
  return getUserSitesV3(params);
}


export function updatePassword(params) {
  if (getOmsVersion() === 2) {
    return updatePasswordV2(params);
  }
  return updatePasswordV3(params);
}
