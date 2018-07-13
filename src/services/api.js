import { http } from 'yc';
import request from '../utils/request';
import { getSys } from '../utils/sysConfig';

const { get } = http;
const sys = getSys();

export async function accountLogin(params) {
  const { password, loginName } = params;
  return get({
    svn: 'OMS_SVR',
    path: 'user/login',
    data: { password, loginName, sys },
  });
}

export async function accountLogout() {
  return get({
    svn: 'OMS_SVR',
    path: 'user/logout',
    data: { sys },
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
