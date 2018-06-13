import { notification } from 'antd';
import { stringify } from 'qs';
import { sysConfig } from 'yc';
import request from './request';

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
    for(const [key, value] of Object.entries(params)) {
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
    const taskServices = sysConfig.getCfgByKey('servicecfg');

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

function getUrl(opt) {
  const {
    svn,
    path,
    params = null,
    isProxy = true,
  } = opt;
  const currentCfg = getTaskServiceCfg(svn);
  let url = isProxy ? currentCfg.url : currentCfg.originalUrl;
  url += getFuncPath(path, params);
  return url;
}

const codeMessage = {
  '-1': '',
};
const defaultErrorText = '错误提示信息为空';

const error = {
  validate: res => {
    if (res === '' || res === null || res === undefined || res.error) {
      return true;
    } else if (res.msgCode) {
      return res.msgCode !== 0;
    }
    return false;
  },
  show: res => {
    let errortext = '';
    if (res.msgCode) {
      errortext = codeMessage[`${res.msgCode}`] || res.msg || defaultErrorText;
    } else if (typeof res !== 'string') {
      errortext = defaultErrorText;
    }

    notification.error({
      message: `服务请求错误`,
      description: errortext,
    });
  },
};

export function get({ svn = 'QUERY_SVR', path = '', data = {} }) {
  const url = getUrl({ svn, path, params: data });
  return request(url).then(res => {
    if (error.validate(res)) {
      error.show(res);
    } else {
      return res;
    }
  });
}

export function post({ svn = 'QUERY_SVR', path = '', data = {} }) {
  const url = getUrl({ svn, path });
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  return request(url, {
    method: 'POST',
    body: formData,
  }).then(res => {
    if (error.validate(res)) {
      error.show(res);
    } else {
      return res;
    }
  });
}

export default { get, post };
