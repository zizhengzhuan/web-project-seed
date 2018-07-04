import { stringify } from 'qs';
import { getCfgByKey } from './sysConfig';
import request from './request';
import { getToken } from '../utils/authority';

const token = getToken();

let taskCfg = null;

/**
 * 获取服务方法路径
 * @param {string} path rest 服务方法路径
 * @returns {string} url 服务方法地址
 * @ignore
 */
function getFuncPath(path = '', params) {
  if (path.length === 0) {
    throw new Error('path 参数不允许为空');
  }

  let nextPath = path.indexOf('/') === 0 ? path : `/${path}`;
  if (params) {
    if (nextPath.indexOf('?') === -1) {
      nextPath += '?';
    }
    // 参数序列化
    const nextPrams = {};
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'object') {
        nextPrams[key] = JSON.stringify(value);
      } else {
        nextPrams[key] = value;
      }
    }
    nextPath += stringify(nextPrams);
  }
  return nextPath;
}

function getTaskServiceCfg(svn) {
  if (taskCfg === null) {
    taskCfg = new Map();
    const taskServices = getCfgByKey('servicecfg');

    const { proxy, service } = taskServices;
    if (!Array.isArray(proxy)) {
      throw new Error('参数 proxy 异常，只允许为数组');
    }
    if (!Array.isArray(service)) {
      throw new Error('参数 service 异常，只允许为数组');
    }
    service.forEach(src => {
      const nextSrc = { ...src };
      if (nextSrc.proxy) {
        for (let i = 0; i < proxy.length; i++) {
          const pry = proxy[i];
          if (pry.status !== '0' && pry.name === nextSrc.proxy) {
            const { url } = nextSrc;
            nextSrc.url = `${pry.url}?${url}`;
            nextSrc.originalUrl = url;
            break;
          }
        }
      }

      taskCfg.set(src.name, nextSrc);
    });
  }
  return taskCfg.get(svn);
}

export function getUrl(opt) {
  const { svn, path, params = null, isProxy = true } = opt;
  const currentCfg = getTaskServiceCfg(svn);
  let url = isProxy ? currentCfg.url : currentCfg.originalUrl;
  url += getFuncPath(path, params);
  return url;
}

export function get({ svn = 'QUERY_SVR', path = '', data = {}, validate = true }) {
  data.token = token; // eslint-disable-line
  const url = getUrl({ svn, path, params: data });
  return request(url, {
    validate,
  });
}

export function post({
  svn = 'QUERY_SVR',
  path = '',
  data = {},
  validate = true,
  contentType = 'www',
}) {
  data.token = token; // eslint-disable-line
  const url = getUrl({ svn, path });
  return request(url, {
    method: 'POST',
    body: data,
    contentType,
    validate,
  });
}

export default { get, post, getUrl };
