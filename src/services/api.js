import { http } from 'yc';
import request from '../utils/request';
import { getSys, getInit } from '../utils/sysConfig';
import { getItem } from '../utils/authority';

const { get } = http;
const sys = getSys();
const init = getInit();
const username = getItem('username');

/**
 * 针对 oms 2.1 版本的登陆服务
 * @param params
 * @return {Promise<void>}
 */
async function loginV2(params) {
  const { password, userName } = params;
  const res = await get({
    svn: 'OMS_SVR',
    path: 'login',
    data: { password, username: userName, sys },
  });
  res.data = {
    token: 'IAmToken',
  };
  return res;
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
  const res = await get({
    svn: 'OMS_SVR',
    path: 'getUserInfo',
    data: { username, sys },
  });
  if (res) {
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

export async function accountLogin(params) {
  if (init.oms && init.oms === '2') {
    return loginV2(params);
  }
  return loginV3(params);
}

export async function accountLogout() {
  if (init.oms && init.oms === '2') {
    return logoutV2();
  }
  return logoutV3();
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryCurrent() {
  if (init.oms && init.oms === '2') {
    return getUserInfoV2();
  }
  return getUserInfoV3();
}
