import { http } from 'yc';
import { message } from 'antd';
import request from '../utils/request';
import { getInit } from '../utils/sysConfig';

const { get } = http;
const iniConfig = getInit();
if (!iniConfig) {
  message.warning('init.json 配置文件异常');
}
const { sys } = iniConfig;
if (!sys) {
  message.warning('sys 节点丢失');
}

export async function accountLogin(params) {
  const { password, userName } = params;
  return get({
    svn: 'OMS_SVR',
    path: 'user/login',
    data: { password, loginName: userName, sys },
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
