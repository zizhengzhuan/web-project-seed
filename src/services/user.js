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

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return get({
    svn: 'OMS_SVR',
    path: 'user/getUserInfoByToken',
    data: { sys },
  });
  // return request('/api/currentUser');
}
